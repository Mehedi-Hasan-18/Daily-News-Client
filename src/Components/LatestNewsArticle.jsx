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

  // Pagination states for all three types
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
        const [articlesRes, mustReadRes, popularRes,dontmissRes] = await Promise.all([
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

        // Set individual counts
        setArticleCount(articlesRes.data.count || 0);
        setMustReadCount(mustReadRes.data.count || 0);
        setPopularCount(popularRes.data.count || 0);
        setDontmissCount(dontmissRes.data.count || 0);

        // Check if any of the three has next/previous
        setHasNext(
          articlesRes.data.next || mustReadRes.data.next || popularRes.data.next || dontmissRes.data.next
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

  // Reset to page 1 when filters change
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

  // Calculate total count from all three types
  const totalCount = articleCount + mustReadCount + popularCount + dontmissCount;

  // Calculate total pages (assuming all use same page size, default 10)
  const pageSize = 10;
  const totalPages = Math.ceil(totalCount / pageSize);

  // Current page items count
  const currentItemsCount =
    articles.length + mustreadarticles.length + populararticles.length + dontmissarticles.length;

  // Generate page numbers to display
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
      <div className="flex justify-center items-center h-screen bg-white">
        <CircleLoader color="#ec4899" size={50} />
      </div>
    );
  }

  const hasArticles = currentItemsCount > 0;

  return (
    <div className="w-11/12 mx-auto mt-10">
      <Filterset
        categories={categories}
        handleCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        handleSearchQuery={setSearchQuery}
      />

      {!hasArticles ? (
        <div className="flex flex-col justify-center items-center py-20">
          <p className="text-xl text-gray-600 mb-4">No articles found</p>
          <button
            onClick={() => {
              setSelectedCategory("");
              setSearchQuery("");
            }}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          {/* Total Count Breakdown */}
          <div className="mb-4 text-gray-600 space-y-1">
            <p className="font-semibold text-lg">
              Total: {totalCount} articles
            </p>
            <div className="flex gap-4 text-sm">
              {articleCount > 0 && <span>Latest: {articleCount}</span>}
              {mustReadCount > 0 && <span>Must Read: {mustReadCount}</span>}
              {popularCount > 0 && <span>Popular: {popularCount}</span>}
              {dontmissCount > 0 && <span>Don't Miss: {dontmissCount}</span>}
            </div>
            <p className="text-sm">Showing {currentItemsCount} on this page</p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((article) => (
              <LatestNews key={`article-${article.id}`} article={article} />
            ))}
            {mustreadarticles.map((article) => (
              <NewsCard key={`mustread-${article.id}`} article={article} />
            ))}
            {populararticles.map((article) => (
              <PopularCard key={`popular-${article.id}`} article={article} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 mb-8">
              {/* Previous Button */}
              <button
                onClick={handlePreviousPage}
                disabled={!hasPrevious}
                className="px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white disabled:hover:bg-white disabled:hover:text-pink-500"
              >
                ← Previous
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {getPageNumbers().map((page, index) => (
                  <React.Fragment key={index}>
                    {page === "..." ? (
                      <span className="px-3 py-2 text-gray-500">...</span>
                    ) : (
                      <button
                        onClick={() => handlePageClick(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          currentPage === page
                            ? "bg-pink-500 text-white"
                            : "bg-white border-2 border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-500"
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
                className="px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white disabled:hover:bg-white disabled:hover:text-pink-500"
              >
                Next →
              </button>
            </div>
          )}

          {/* Page Info */}
          {totalPages > 1 && (
            <div className="text-center text-gray-600 mb-8">
              Page {currentPage} of {totalPages}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LatestNewsArticle;
