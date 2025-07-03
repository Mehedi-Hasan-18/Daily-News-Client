import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../Services/apiClient";
import { Calendar, User, Tag, Clock, Share2, Bookmark } from "lucide-react";
import { format } from "date-fns";

const ArticlesDetailss = () => {
  const { id } = useParams();
  const [article, SetArticle] = useState(null);

  useEffect(() => {
    apiClient
      .get(`/articles/${id}`)
      .then((res) => SetArticle(res.data));
  }, [id]);

  if (!article) return <div>Loading.........</div>;

  const formattedDate = (date) => format(new Date(date), "MMM dd yyyy");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Category and Meta Info */}
          <div className="px-6 sm:px-8 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <Tag className="w-4 h-4 text-red-600" />
                <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm font-medium uppercase tracking-wide">
                  {article.category.name}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center space-x-1 text-xl">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate(article.publishing_date)}</span>
                </div>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {article.headline}
            </h1>

            {/* Author Info */}
            <div className="flex items-center space-x-4 pb-6 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {article.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="flex items-center space-x-2 text-xl">
                  <span className="font-medium text-gray-900 ">
                    By {article.author.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Featured Image Placeholder */}
          {article.images.map((image) => (
            <img
              className="w-full h-[400px] sm:h-80 lg:h-[400px] mb-10"
              src={image.image}
            />
          ))}
          <div className="px-6 sm:px-8 pb-8 text-xl">
            {article.body}

            {/* Article Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text text-gray-500">
                  <span>
                    Published: {formattedDate(article.publishing_date)}
                  </span>
                  {article.updated_at !== article.created_at && (
                    <span className="ml-4">
                      Last updated: {formattedDate(article.updated_at)}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    Share this article:
                  </span>
                  <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Author Bio */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              {article.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                About {article.author.name}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {article.author.biography}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticlesDetailss;
