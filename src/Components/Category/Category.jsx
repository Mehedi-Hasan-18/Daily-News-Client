import React, { useEffect, useState } from "react";
import apiClient from "../../Services/apiClient";
import CategoryDetails from "./CategoryDetails";
import { CircleLoader, BeatLoader, RingLoader } from "react-spinners";

const Category = () => {
  const [categories, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await apiClient.get("/categories/");
        setCategory(res.data.results);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <CircleLoader color="#ec4899" size={50} />
      </div>
    );
  }

  return (
    <section className="py-16 w-11/12 mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold mb-2">All Categories</h2>
        <p className="text-gray-500 text-lg">
          Explore a wide range of categories
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <CategoryDetails
            key={category.id}
            index={category.id}
            category={category}
          />
        ))}
      </div>
    </section>
  );
};

export default Category;
