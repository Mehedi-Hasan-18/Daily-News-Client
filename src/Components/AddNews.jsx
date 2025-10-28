import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../Services/apiClient";
import authApiClient from "../Services/authApiClient";
import { useNavigate } from "react-router-dom";

const AddNews = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [newsId, setNewsId] = useState(null);
  const [articleType, setArticleType] = useState("articles"); // Default type
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Submit Article Details
  const handleNewsAdd = async (data) => {
    console.log(data);
    const selectedCategory = categories.find(
      (cat) => cat.name === data.category
    );
    const selectedAuthor = authors.find((auth) => auth.name === data.author);

    const formattedData = {
      headline: data.headline,
      body: data.body,
      category: {
        id: selectedCategory.id,
        name: selectedCategory.name,
        descriptions: selectedCategory.descriptions,
      },
      author: {
        id: selectedAuthor.id,
        name: selectedAuthor.name,
        biography: selectedAuthor.biography,
      },
      publishing_date: data.publishing_date,
    };

    try {
      // Post to selected endpoint based on article type
      const endpoint =
        data.articleType === "mustread"
          ? "/mustread-articles/"
          : data.articleType === "popular"
          ? "/popular-articles/"
          :data.articleType === "dontmiss"
          ? "/dontmiss-articles/"
          : "/articles/";

      const newsRes = await authApiClient.post(endpoint, formattedData);
      setNewsId(newsRes.data.id);
      setArticleType(data.articleType || "articles");
      alert(`${getArticleTypeName(data.articleType)} added successfully!`);
    } catch (error) {
      console.log("Error adding news", error);
      alert("Failed to add article. Please try again.");
    }
  };

  // Get article type display name
  const getArticleTypeName = (type) => {
    switch (type) {
      case "mustread":
        return "Must Read Article";
      case "popular":
        return "Popular Article";
      case "Dont Miss":
        return "Dont Miss Article";
      default:
        return "Article";
    }
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  // Handle Image Upload
  const navigate = useNavigate();
  const handleUpload = async () => {
    if (!images.length) return alert("Please select images.");
    setLoading(true);

    try {
      // Determine the correct endpoint based on article type
      const imageEndpoint =
        articleType === "mustread"
          ? `/mustread-articles/${newsId}/images/`
          : articleType === "popular"
          ? `/popular-articles/${newsId}/images/`
          : articleType === "dontmiss"
          ? `/dontmiss-articles/${newsId}/images/`
          : `/articles/${newsId}/images/`;

      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);
        await authApiClient.post(imageEndpoint, formData);
      }

      setLoading(false);
      alert("Images uploaded successfully");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setLoading(false);
      console.log("Error uploading image", error);
      alert("Failed to upload images. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-center text-2xl text-blue-400 font-semibold mb-6">
        Add News Form
      </h1>

      {!newsId ? (
        <form onSubmit={handleSubmit(handleNewsAdd)} className="space-y-4">
          {/* Article Type Selection */}
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <label className="block text-sm font-semibold mb-2 text-blue-700">
              Article Type *
            </label>
            <div className="grid grid-cols-3 gap-3">
              <label className="flex items-center p-3 bg-white rounded-lg border-2 cursor-pointer hover:border-blue-400 transition">
                <input
                  type="radio"
                  {...register("articleType", { required: true })}
                  value="articles"
                  defaultChecked
                  className="radio radio-primary mr-2"
                />
                <span className="font-medium">Normal</span>
              </label>

              <label className="flex items-center p-3 bg-white rounded-lg border-2 cursor-pointer hover:border-pink-400 transition">
                <input
                  type="radio"
                  {...register("articleType", { required: true })}
                  value="mustread"
                  className="radio radio-secondary mr-2"
                />
                <span className="font-medium">Must Read</span>
              </label>

              <label className="flex items-center p-3 bg-white rounded-lg border-2 cursor-pointer hover:border-purple-400 transition">
                <input
                  type="radio"
                  {...register("articleType", { required: true })}
                  value="popular"
                  className="radio radio-accent mr-2"
                />
                <span className="font-medium">Popular</span>
              </label>
              <label className="flex items-center p-3 bg-white rounded-lg border-2 cursor-pointer hover:border-purple-400 transition">
                <input
                  type="radio"
                  {...register("articleType", { required: true })}
                  value="dontmiss"
                  className="radio radio-accent mr-2"
                />
                <span className="font-medium">Dont Miss</span>
              </label>
            </div>
            {errors.articleType && (
              <p className="text-red-500 text-xs mt-1">
                Please select article type
              </p>
            )}
          </div>

          {/* News Headline */}
          <div>
            <label className="block text-sm font-medium">News Headline *</label>
            <input
              {...register("headline", { required: true, maxLength: 300 })}
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
            ></textarea>
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
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs">Category is required</p>
            )}
          </div>

          {/* Author Dropdown */}
          <div>
            <label className="block text-sm font-medium">Author *</label>
            <select
              {...register("author", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select an author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
            {errors.author && (
              <p className="text-red-500 text-xs">Author is required</p>
            )}
          </div>

          {/* Publishing Date */}
          <div>
            <label className="block text-sm font-medium">
              Publishing Date *
            </label>
            <input
              type="datetime-local"
              {...register("publishing_date", { required: true })}
              className="w-full mt-1 border px-3 py-2 rounded"
            />
            {errors.publishing_date && (
              <p className="text-red-500 text-xs">
                Publishing date is required
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-white font-semibold"
          >
            Add Article
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              {getArticleTypeName(articleType)} created successfully! Now upload
              images.
            </span>
          </div>

          <h3 className="text-lg font-semibold mb-2">Upload Article Images</h3>
          <input
            type="file"
            multiple
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />

          {previewImages.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                Selected {previewImages.length} image(s):
              </p>
              <div className="grid grid-cols-4 gap-2">
                {previewImages.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-24 rounded-lg object-cover border-2 border-gray-200"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleUpload}
              className="btn btn-primary flex-1"
              disabled={loading || images.length === 0}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Uploading...
                </>
              ) : (
                "Upload Images"
              )}
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="btn btn-outline"
              disabled={loading}
            >
              Skip Images
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNews;
