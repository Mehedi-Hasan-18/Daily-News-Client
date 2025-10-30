import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../Services/apiClient";
import NewsCard from "../NewsCard";
import ArticleCard from "../ArticleCard";
import LatestNews from "../../Pages/LatestNews";
import PopularCard from "../PopularCard";

const ArticleByCategory = () => {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [mustreadarticles, setMustReadArticles] = useState([]);
  const [populararticles, setPopularArticles] = useState([]);
  const [dontmissarticles, setDontmissarticles] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articlesRes, mustReadRes, popularRes, dontmissRes, categoryRes] =
          await Promise.all([
            apiClient.get(`/articles/?category_id=${id}`),
            apiClient.get(`/mustread-articles/?category_id=${id}`),
            apiClient.get(`/popular-articles/?category_id=${id}`),
            apiClient.get(`/dontmiss-articles/?category_id=${id}`),
            apiClient.get(`/categories/${id}`),
          ]);
        setArticles(articlesRes.data.results);
        setMustReadArticles(mustReadRes.data.results || []);
        setPopularArticles(popularRes.data.results || []);
        setDontmissarticles(dontmissRes.data.results || []);
        setCategory(categoryRes.data);
      } catch (error) {
        console.error("Error fetching category or products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading....</div>;
  return (
    <section className="py-16 w-11/12 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        Articles in {category?.name} Category
      </h2>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <LatestNews key={article.id} article={article} />
          ))}
          {mustreadarticles.map((article) => (
            <NewsCard key={`mustread-${article.id}`} article={article} />
          ))}
          {populararticles.map((article) => (
            <PopularCard key={`popular-${article.id}`} article={article} />
          ))}
          {dontmissarticles.map((article) => (
            <PopularCard key={`dontmiss-${article.id}`} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-xl">
          📰 No articles found in this category.
        </p>
      )}
    </section>
  );
};

export default ArticleByCategory;
