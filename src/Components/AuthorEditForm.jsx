import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import authApiClient from "../Services/authApiClient";

const AuthorEditForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  useEffect(() => {
    authApiClient.get(`/authors/${id}/`).then((res) => reset(res.data));
  }, [id, reset]);

  const onSubmit = (data) => {
    authApiClient
      .patch(`/authors/${id}/`, data)
      .then(() => alert("Author updated successfully"))
      .catch((err) => console.error("Update error:", err));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6 bg-white rounded-lg shadow-md"
    >
      <div>
        <h1 className="text-center text-2xl text-blue-400 font-semibold">Authors Edit Form</h1>
        <label className="block text-sm font-medium">Author Name</label>
        <input
          {...register("name", {
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
          {...register("biography", { required: true, minLength: 1 })}
          className="w-full mt-1 border px-3 py-2 rounded"
        />
        {errors.author?.biography && (
          <p className="text-red-500 text-sm">Biography is required</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update
      </button>
    </form>
  );
};

export default AuthorEditForm;
