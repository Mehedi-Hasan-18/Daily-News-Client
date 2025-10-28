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
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleDeleteImage = async (imageId) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await authApiClient.delete(`/articles/${id}/images/${imageId}/`);
        setExistingImages(existingImages.filter(img => img.id !== imageId));
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
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-center text-2xl text-blue-400 font-semibold">
          Article Edit Form
        </h1>

        {/* Headline */}
        <div>
          <label className="block text-sm font-medium">Headline</label>
          <input
            {...register("headline", {
              required: true,
              minLength: 1,
              maxLength: 300,
            })}
            className="w-full mt-1 border px-3 py-2 rounded"
          />
          {errors.headline && (
            <p className="text-red-500 text-sm">
              Headline is required (1-300 chars)
            </p>
          )}
        </div>

        {/* Body */}
        <div>
          <label className="block text-sm font-medium">Body</label>
          <textarea
            {...register("body", { required: true, minLength: 1 })}
            className="w-full mt-1 border px-3 py-2 rounded"
            rows="6"
          />
          {errors.body && (
            <p className="text-red-500 text-sm">Body is required</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category Name</label>
          <input
            {...register("category.name", {
              required: true,
              minLength: 1,
              maxLength: 200,
            })}
            className="w-full mt-1 border px-3 py-2 rounded"
          />
          {errors.category?.name && (
            <p className="text-red-500 text-sm">Category name is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">
            Category Description
          </label>
          <input
            {...register("category.descriptions", {
              required: true,
              minLength: 1,
            })}
            className="w-full mt-1 border px-3 py-2 rounded"
          />
          {errors.category?.descriptions && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium">Author Name</label>
          <input
            {...register("author.name", {
              required: true,
              minLength: 1,
              maxLength: 150,
            })}
            className="w-full mt-1 border px-3 py-2 rounded"
          />
          {errors.author?.name && (
            <p className="text-red-500 text-sm">Author name is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Author Biography</label>
          <textarea
            {...register("author.biography", { required: true, minLength: 1 })}
            className="w-full mt-1 border px-3 py-2 rounded"
            rows="3"
          />
          {errors.author?.biography && (
            <p className="text-red-500 text-sm">Biography is required</p>
          )}
        </div>

        {/* Publishing Date */}
        <div>
          <label className="block text-sm font-medium">Publishing Date</label>
          <input
            type="datetime-local"
            {...register("publishing_date", { required: true })}
            className="w-full mt-1 border px-3 py-2 rounded"
          />
          {errors.publishing_date && (
            <p className="text-red-500 text-sm">Publishing date is required</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Article
        </button>
      </form>

      {/* Image Management Section */}
      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Article Images</h2>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Current Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {existingImages.map((img) => (
                <div key={img.id} className="relative group">
                  <img
                    src={img.image}
                    alt="Article"
                    className="w-full h-40 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(img.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
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
            className="w-full mt-1 border px-3 py-2 rounded"
          />

          {/* Preview Selected Images */}
          {previewUrls.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                Selected {selectedFiles.length} image(s)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-40 object-cover rounded border"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={uploadImages}
                disabled={uploading}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
              >
                {uploading ? "Uploading..." : "Upload Images"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleEditForm;