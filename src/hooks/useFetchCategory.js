import { useEffect, useState } from "react";
import apiClient from "../Services/apiClient";

const useFetchCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiClient.get("/categories").then((res) => setCategories(res.data));
  }, []);

  return categories;
};

export default useFetchCategory;
