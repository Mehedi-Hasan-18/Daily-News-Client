import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import SideNewsCard from "./SideNewsCard";
import SocialMedia from "./SocialMedia";
import apiClient from "../Services/apiClient";

const MustRead = () => {
  const [mustReadarticles, setMustReadArticle] = useState([]);
  const [dontMissarticles, setDontMissArticle] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Loading1, setLoading1] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/mustread-articles/");
        setMustReadArticle(response.data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading1(true);
        const response = await apiClient.get("/dontmiss-articles/");
        setDontMissArticle(response.data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading1(false);
      }
    };
    fetchArticle();
  }, []);
  return (
    <div className="w-11/12 mx-auto">
      <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-3 py-2 sm:px-4 text-sm sm:text-base font-semibold shadow-md inline-block rounded-sm">
        Must Read
      </span>

      {Loading && (
        <div className="text-center py-8 text-sm sm:text-base">
          Loading........
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:justify-between mt-4 sm:mt-5 gap-6 lg:gap-10">
        {/* Left Side - NewsCards with Scroll */}
        <div className="w-full lg:w-2/3">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 overflow-y-auto pr-1 sm:pr-2 mb-6 sm:mb-10"
            style={{
              maxHeight: "500px",
              scrollbarWidth: "thin",
              scrollbarColor: "#e91e63 #f1f1f1",
            }}
          >
            {!Loading && mustReadarticles && mustReadarticles.length > 0 ? (
              mustReadarticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 text-center text-gray-500 py-8 text-sm sm:text-base">
                No articles available
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Sidebar */}
        <div className="w-full lg:w-1/3">
          {/* Stay Connected Section */}
          <div className="mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-3 py-2 sm:px-4 text-sm sm:text-base font-semibold shadow-md inline-block rounded-sm">
              Stay Connected
            </span>
            <div className="mt-3">
              <SocialMedia />
            </div>
          </div>

          {/* Don't Miss Section with Scroll */}
          <div>
            <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-3 py-2 sm:px-4 text-sm sm:text-base font-semibold shadow-md inline-block mb-4 sm:mb-5 rounded-sm">
              Don't Miss
            </span>
            <div
              className="overflow-y-auto pr-1 sm:pr-2 mb-6 sm:mb-10"
              style={{
                maxHeight: "280px",
                scrollbarWidth: "thin",
                scrollbarColor: "#e91e63 #f1f1f1",
              }}
            >
              {!Loading && dontMissarticles && dontMissarticles.length > 0 ? (
                dontMissarticles.map((article) => (
                  <SideNewsCard key={article.id} article={article} />
                ))
              ) : (
                <div className="text-center text-gray-500 py-8 text-sm sm:text-base">
                  No articles available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MustRead;
