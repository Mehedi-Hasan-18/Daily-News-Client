import { useForm } from "react-hook-form";
import apiClient from "../Services/apiClient";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import authApiClient from "../Services/authApiClient";

const ArticleEditForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { id } = useParams();

  useEffect(() => {
    apiClient.get(`/articles/${id}`).then((res) => {
      const data = res.data;

      const date = new Date(data.publishing_date);
      const formatted = date.toISOString().slice(0, 16);

      data.publishing_date = formatted;
      reset(data);
    });
  }, [id, reset]);

  const onSubmit = (data) => {
    authApiClient
      .patch(`/articles/${id}/`, data)
      .then(() => alert("Article updated successfully"))
      .catch((err) => console.error("Update error:", err));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6 bg-white rounded-lg shadow-md"
    >
      {/* Headline */}
      <div>
        <h1 className="text-center text-2xl text-blue-400 font-semibold">Article Edit Form</h1>
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
  );
};

export default ArticleEditForm;
