import { useForm } from "react-hook-form";
import apiClient from "../Services/apiClient";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import authApiClient from "../Services/authApiClient";

const ArticleEditForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { id } = useParams();
  const [existingImages, setExistingImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  // Fetch Categories
  useEffect(() => {
    apiClient.get("/categories/").then((res) => {
      setCategories(res.data.results || res.data);
    });
  }, []);

  // Fetch Authors
  useEffect(() => {
    apiClient.get("/authors/").then((res) => {
      setAuthors(res.data.results || res.data);
    });
  }, []);

  // Fetch Article Data
  useEffect(() => {
    apiClient.get(`/articles/${id}`).then((res) => {
      const data = res.data;

      const date = new Date(data.publishing_date);
      const formatted = date.toISOString().slice(0, 16);

      data.publishing_date = formatted;
      setExistingImages(data.images || []);
      reset(data);
    });
  }, [id, reset]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Create preview URLs
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleDeleteImage = async (imageId) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await authApiClient.delete(`/articles/${id}/images/${imageId}/`);
        setExistingImages(existingImages.filter((img) => img.id !== imageId));
        alert("Image deleted successfully");
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete image");
      }
    }
  };

  const uploadImages = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        return authApiClient.post(`/articles/${id}/images/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      });

      await Promise.all(uploadPromises);

      // Refresh images
      const res = await apiClient.get(`/articles/${id}`);
      setExistingImages(res.data.images || []);

      // Clear selection
      setSelectedFiles([]);
      setPreviewUrls([]);

      alert("Images uploaded successfully");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data) => {
    authApiClient
      .patch(`/articles/${id}/`, data)
      .then(() => alert("Article updated successfully"))
      .catch((err) => console.error("Update error:", err));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-center text-2xl text-blue-400 font-semibold mb-6">
          Article Edit Form
        </h1>

        {/* Article Type Selection */}
        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
          <label className="block text-sm font-semibold mb-2 text-blue-700">
            Article Type *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center p-3 bg-white rounded-lg border-2 cursor-pointer hover:border-blue-400 transition">
              <input
                type="radio"
                {...register("types", { required: true })}
                value="normal"
                className="radio radio-primary mr-2"
              />
              <span className="font-medium">Normal</span>
            </label>

            <label className="flex items-center p-3 bg-white rounded-lg border-2 cursor-pointer hover:border-pink-400 transition">
              <input
                type="radio"
                {...register("types", { required: true })}
                value="mustread"
                className="radio radio-secondary mr-2"
              />
              <span className="font-medium">Must Read</span>
            </label>

            <label className="flex items-center p-3 bg-white rounded-lg border-2 cursor-pointer hover:border-purple-400 transition">
              <input
                type="radio"
                {...register("types", { required: true })}
                value="popular"
                className="radio radio-accent mr-2"
              />
              <span className="font-medium">Popular</span>
            </label>

            <label className="flex items-center p-3 bg-white rounded-lg border-2 cursor-pointer hover:border-green-400 transition">
              <input
                type="radio"
                {...register("types", { required: true })}
                value="dontmiss"
                className="radio radio-accent mr-2"
              />
              <span className="font-medium">Don't Miss</span>
            </label>
          </div>
          {errors.types && (
            <p className="text-red-500 text-xs mt-1">
              Please select article type
            </p>
          )}
        </div>

        {/* Headline */}
        <div>
          <label className="block text-sm font-medium">News Headline *</label>
          <input
            {...register("headline", {
              required: true,
              minLength: 1,
              maxLength: 300,
            })}
            className="input input-bordered w-full"
            placeholder="Enter news headline"
          />
          {errors.headline && (
            <p className="text-red-500 text-xs">
              Headline is required (max 300 characters)
            </p>
          )}
        </div>

        {/* Body */}
        <div>
          <label className="block text-sm font-medium">Body *</label>
          <textarea
            {...register("body", { required: true, minLength: 10 })}
            className="textarea textarea-bordered w-full h-32"
            placeholder="Enter article body content"
          />
          {errors.body && (
            <p className="text-red-500 text-xs">
              Body is required (minimum 10 characters)
            </p>
          )}
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium">Category *</label>
          <select
            {...register("category.id", {
              required: "Category is required",
            })}
            className="select select-bordered w-full"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category?.id && (
            <p className="text-red-500 text-xs">{errors.category.id.message}</p>
          )}
        </div>

        {/* Author Dropdown */}
        <div>
          <label className="block text-sm font-medium">Author *</label>
          <select
            {...register("author.id", {
              required: "Author is required",
            })}
            className="select select-bordered w-full"
          >
            <option value="">Select an author</option>
            {authors.map((auth) => (
              <option key={auth.id} value={auth.id}>
                {auth.name}
              </option>
            ))}
          </select>
          {errors.author?.id && (
            <p className="text-red-500 text-xs">{errors.author.id.message}</p>
          )}
        </div>

        {/* Publishing Date */}
        <div>
          <label className="block text-sm font-medium">Publishing Date *</label>
          <input
            type="datetime-local"
            {...register("publishing_date", { required: true })}
            className="w-full mt-1 border px-3 py-2 rounded"
          />
          {errors.publishing_date && (
            <p className="text-red-500 text-xs">Publishing date is required</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full text-white font-semibold"
        >
          Update Article
        </button>
      </form>

      {/* Image Management Section */}
      <div className="border-t pt-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Article Images</h2>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Current Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {existingImages.map((img) => (
                <div key={img.id} className="relative group">
                  <img
                    src={img.image}
                    alt="Article"
                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(img.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload New Images */}
        <div>
          <h3 className="text-lg font-medium mb-3">Add New Images</h3>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />

          {/* Preview Selected Images */}
          {previewUrls.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                Selected {selectedFiles.length} image(s)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={uploadImages}
                disabled={uploading}
                className="btn btn-success w-full"
              >
                {uploading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Uploading...
                  </>
                ) : (
                  "Upload Images"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleEditForm;
