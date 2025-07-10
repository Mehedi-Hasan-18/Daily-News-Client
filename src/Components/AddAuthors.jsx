import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authApiClient from "../Services/authApiClient";

const AddAuthors = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await authApiClient.post("/authors/", data);
      setSuccessMessage("✅ Author added successfully!");
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (error) {
      console.error("Error adding Author:", error);
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
          Authors Details Form
        </h1>
        <div>
          <label className="block text-sm font-medium">Author Name</label>
          <input
            {...register("name", {
              required: true,
              minLength: 1,
              maxLength: 200,
            })}
            className="w-full mt-1 border px-3 py-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Author name is required</p>
          )}
          <label className="block text-sm font-medium">Author Biography</label>
          <textarea
            {...register("biography", {
              required: true,
              minLength: 1,
              maxLength: 200,
            })}
            className="w-full mt-1 border px-3 py-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Author Biography is required</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Author
        </button>
      </form>
    </div>
  );
};

export default AddAuthors;
