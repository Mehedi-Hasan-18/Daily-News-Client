import { useForm } from "react-hook-form";
import apiClient from "../Services/apiClient";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import authApiClient from "../Services/authApiClient";

const CategoryEditForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { id } = useParams();

  useEffect(() => {
    apiClient.get(`/categories/${id}`).then((res) => {
      reset(res.data);
    });
  }, [id, reset]);

  const onSubmit = (data) => {
    authApiClient
      .patch(`/categories/${id}/`, data)
      .then(() => alert("Categories updated successfully"))
      .catch((err) => console.error("Update error:", err));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6 bg-white rounded-lg shadow-md"
    >
      <div>
        <label className="block text-sm font-medium">Category Name</label>
        <input
          {...register("name", {
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
          {...register("descriptions", {
            required: true,
            minLength: 1,
          })}
          className="w-full mt-1 border px-3 py-2 rounded"
        />
        {errors.category?.descriptions && (
          <p className="text-red-500 text-sm">Description is required</p>
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

export default CategoryEditForm;
