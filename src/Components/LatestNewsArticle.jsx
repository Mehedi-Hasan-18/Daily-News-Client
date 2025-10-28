import React, { useEffect, useState } from "react";
import apiClient from "../Services/apiClient";
import LatestNews from "../Pages/LatestNews";
import NewsCard from "./NewsCard";
import PopularCard from "./PopularCard";
import Filterset from "./Filterset";
import useFetchCategory from "../hooks/useFetchCategory";
import { CircleLoader } from "react-spinners";

const LatestNewsArticle = () => {
  const [articles, setArticles] = useState([]);
  const [mustreadarticles, setMustReadArticles] = useState([]);
  const [populararticles, setPopularArticles] = useState([]);
  const [dontmissarticles, setDontmissarticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [articleCount, setArticleCount] = useState(0);
  const [mustReadCount, setMustReadCount] = useState(0);
  const [popularCount, setPopularCount] = useState(0);
  const [dontmissCount, setDontmissCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const categories = useFetchCategory();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const [articlesRes, mustReadRes, popularRes, dontmissRes] =
          await Promise.all([
            apiClient.get(
              `/articles/?category_id=${selectedCategory}&search=${searchQuery}&page=${currentPage}`
            ),
            apiClient.get(
              `/mustread-articles/?category_id=${selectedCategory}&search=${searchQuery}&page=${currentPage}`
            ),
            apiClient.get(
              `/popular-articles/?category_id=${selectedCategory}&search=${searchQuery}&page=${currentPage}`
            ),
            apiClient.get(
              `/dontmiss-articles/?category_id=${selectedCategory}&search=${searchQuery}&page=${currentPage}`
            ),
          ]);

        setArticles(articlesRes.data.results || []);
        setMustReadArticles(mustReadRes.data.results || []);
        setPopularArticles(popularRes.data.results || []);
        setDontmissarticles(dontmissRes.data.results || []);

        setArticleCount(articlesRes.data.count || 0);
        setMustReadCount(mustReadRes.data.count || 0);
        setPopularCount(popularRes.data.count || 0);
        setDontmissCount(dontmissRes.data.count || 0);

        setHasNext(
          articlesRes.data.next ||
            mustReadRes.data.next ||
            popularRes.data.next ||
            dontmissRes.data.next
        );
        setHasPrevious(
          articlesRes.data.previous ||
            mustReadRes.data.previous ||
            popularRes.data.previous ||
            dontmissRes.data.previous
        );
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
        setMustReadArticles([]);
        setPopularArticles([]);
        setDontmissarticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory, searchQuery, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const handleNextPage = () => {
    if (hasNext) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (hasPrevious) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalCount =
    articleCount + mustReadCount + popularCount + dontmissCount;
  const pageSize = 10;
  const totalPages = Math.ceil(totalCount / pageSize);
  const currentItemsCount =
    articles.length +
    mustreadarticles.length +
    populararticles.length +
    dontmissarticles.length;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50">
        <CircleLoader color="#ec4899" size={60} />
        <p className="mt-6 text-gray-600 font-medium animate-pulse">
          Loading articles...
        </p>
      </div>
    );
  }

  const hasArticles = currentItemsCount > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {/* Filter Section */}
        <div className="mb-8">
          <Filterset
            categories={categories}
            handleCategoryChange={setSelectedCategory}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            handleSearchQuery={setSearchQuery}
          />
        </div>

        {!hasArticles ? (
          <div className="flex flex-col justify-center items-center py-20 sm:py-32">
            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center max-w-md">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-pink-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No Articles Found
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any articles matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setSearchQuery("");
                }}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {totalCount} Articles Available
                  </h2>
                  <div className="flex flex-wrap gap-3 text-sm">
                    {articleCount > 0 && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                        Latest: {articleCount}
                      </span>
                    )}
                    {mustReadCount > 0 && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                        Must Read: {mustReadCount}
                      </span>
                    )}
                    {popularCount > 0 && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                        Popular: {popularCount}
                      </span>
                    )}
                    {dontmissCount > 0 && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                        Don't Miss: {dontmissCount}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Showing</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {currentItemsCount}
                  </p>
                  <p className="text-sm text-gray-500">on this page</p>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {articles.map((article) => (
                <LatestNews key={`article-${article.id}`} article={article} />
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

            {/* Modern Pagination */}
            {totalPages > 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Previous Button */}
                  <button
                    onClick={handlePreviousPage}
                    disabled={!hasPrevious}
                    className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl disabled:hover:from-pink-500 disabled:hover:to-purple-500 transform hover:scale-105 disabled:hover:scale-100"
                  >
                    <svg
                      className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {getPageNumbers().map((page, index) => (
                      <React.Fragment key={index}>
                        {page === "..." ? (
                          <span className="px-4 py-2 text-gray-400 font-semibold">
                            ...
                          </span>
                        ) : (
                          <button
                            onClick={() => handlePageClick(page)}
                            className={`min-w-[44px] px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                              currentPage === page
                                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-110"
                                : "bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:text-pink-700 hover:scale-105"
                            }`}
                          >
                            {page}
                          </button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleNextPage}
                    disabled={!hasNext}
                    className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl disabled:hover:from-pink-500 disabled:hover:to-purple-500 transform hover:scale-105 disabled:hover:scale-100"
                  >
                    Next
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Page Info */}
                <div className="text-center mt-6 pt-6 border-t border-gray-200">
                  <p className="text-gray-600 font-medium">
                    Page{" "}
                    <span className="text-pink-600 font-bold text-lg">
                      {currentPage}
                    </span>{" "}
                    of{" "}
                    <span className="text-purple-600 font-bold text-lg">
                      {totalPages}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LatestNewsArticle;
