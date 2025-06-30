import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../Services/apiClient";
import NewsCard from "../NewsCard";
import ArticleCard from "../ArticleCard";

const ArticleByCategory = () => {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articlesRes, categoryRes] = await Promise.all([
          apiClient.get(`/articles/?category_id=${id}`),
          apiClient.get(`/categories/${id}`),
        ]);
        setArticles(articlesRes.data);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default ArticleByCategory;
