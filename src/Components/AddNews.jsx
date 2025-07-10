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
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Categories
  useEffect(() => {
    apiClient.get("/categories/").then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
  }, []);
  // Fetch Authors
  useEffect(() => {
    apiClient.get("/authors/").then((res) => {
      console.log(res.data);
      setAuthors(res.data);
    });
  }, []);

  // Submit Product Details
  const handleNewsAdd = async (data) => {
    console.log(data)
    const selectedCategory = categories.find(
      (cat) => cat.name === data.category
    );
    const selectedAuthor = authors.find(
      (auth) => auth.name === data.author
    );

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
      const newsRes = await authApiClient.post("/articles/", formattedData);
      setNewsId(newsRes.data.id);
    } catch (error) {
      console.log("Error adding news", error);
    }
    console.log("Sending data:", formattedData);
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  // Handle Image Upload
  const navigate = useNavigate()
  const handleUpload = async () => {
    if (!images.length) return alert("Please select images.");
    setLoading(true);
    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);
        console.log(formData);
        await authApiClient.post(`/articles/${newsId}/images/`, formData);
        setLoading(false);
      }
      alert("Images uploaded successfully");
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (error) {
      console.log(("Error uploading image", error));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-center text-2xl text-blue-400 font-semibold">Add News Form</h1>
      {!newsId ? (
        <form onSubmit={handleSubmit(handleNewsAdd)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">News Headline</label>
            <input
              {...register("headline", { required: true })}
              className="input input-bordered w-full"
              placeholder="News Headline"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">This field is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Body</label>
            <textarea
              {...register("body", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Body"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs">This field is required</p>
            )}
          </div>

          {/* Dropdown for categories */}
          <div>
            <label className="block text-sm font-medium">Category</label>
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
              <p className="text-red-500 text-xs">This field is required</p>
            )}
          </div>
          {/* Dropdown for Authors */}
          <div>
            <label className="block text-sm font-medium">Authors</label>
            <select
              {...register("author", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select a Authors</option>
              {authors.map((author) => (
                <option key={author.id} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
            {errors.authors && (
              <p className="text-red-500 text-xs">This field is required</p>
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
              <p className="text-red-500 text-sm">
                Publishing date is required
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Add News
          </button>
        </form>
      ) : (
        <div>
          <h3 className="text-lg font-medium mb-2">Upload News Images</h3>
          <input
            type="file"
            multiple
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />
          {previewImages.length > 0 && (
            <div className="flex gap-2 mt-2">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Preview"
                  className="w-16 h-16 rounded-md object-cover"
                />
              ))}
            </div>
          )}

          <button
            onClick={handleUpload}
            className="btn btn-primary w-full mt-2"
            disabled={loading}
          >
            {loading ? "Uploading images..." : "Upload Images"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddNews;
