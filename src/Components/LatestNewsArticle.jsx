import React, { useEffect, useState } from "react";
import apiClient from "../Services/apiClient";
import LatestNews from "../Pages/LatestNews";
import NewsCard from "./NewsCard";
import SideNewsCard from "./SideNewsCard";
import PopularCard from "./PopularCard";
import Filterset from "./Filterset";
import useFetchCategory from "../hooks/useFetchCategory";

const LatestNewsArticle = () => {
  const [articles, setArticles] = useState([]);
  const [mustreadarticles, setMustReadArticles] = useState([]);
  const [populararticles, setPopularArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useFetchCategory();
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const [articlesRes, mustReadRes, popularRes] = await Promise.all([
          apiClient.get(
            `/articles/?category_id=${selectedCategory}&search=${searchQuery}`
          ),
          apiClient.get(
            `/mustread-articles/?category_id=${selectedCategory}&search=${searchQuery}`
          ),
          apiClient.get(
            `/popular-articles/?category_id=${selectedCategory}&search=${searchQuery}`
          ),
        ]);

        setArticles(articlesRes.data);
        setMustReadArticles(mustReadRes.data);
        setPopularArticles(popularRes.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [selectedCategory, searchQuery]);
  if (
    articles.length === 0 &&
    mustreadarticles.length === 0 &&
    populararticles.length === 0
  )
    return <div>Loading...........</div>;

  return (
    <div className="w-11/12 mx-auto mt-10 ">
      <Filterset
        categories={categories}
        handleCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        handleSearchQuery={setSearchQuery}
      ></Filterset>
      <div className="grid grid-cols-2 mt-10 lg:grid-cols-3 sm:grid-cols-1 gap-10">
        {articles.map((article) => (
          <LatestNews key={article.id} article={article}></LatestNews>
        ))}
        {mustreadarticles.map((article) => (
          <NewsCard key={article.id} article={article}></NewsCard>
        ))}
        {populararticles.map((article) => (
          <PopularCard key={article.id} article={article}></PopularCard>
        ))}
      </div>
    </div>
  );
};

export default LatestNewsArticle;
