import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authApiClient from "../Services/authApiClient";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await authApiClient.post("/categories/", data);
      setSuccessMessage("✅ Category added successfully!");
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (error) {
      console.error("Error adding category:", error);
      setSuccessMessage("");
    }
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-md">
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-center text-2xl text-blue-400 font-semibold">
          Category Details Form
        </h1>
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
          {errors.name && (
            <p className="text-red-500 text-sm">Category name is required</p>
          )}
          <label className="block text-sm font-medium">
            Category Description
          </label>
          <textarea
            {...register("descriptions", {
              required: true,
            })}
            className="w-full mt-1 border px-3 py-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">
              Category Descriptions is required
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
