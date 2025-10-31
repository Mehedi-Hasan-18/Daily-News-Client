import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import SideNewsCard from "./SideNewsCard";
import SocialMedia from "./SocialMedia";
import apiClient from "../Services/apiClient";
import { Zap, MessageCircle } from "lucide-react";

const MustRead = () => {
  const [mustReadarticles, setMustReadArticle] = useState([]);
  const [dontMissarticles, setDontMissArticle] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Loading1, setLoading1] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/articles/");
        if (response.data.results) {
          const filtered = response.data.results.filter(
            (article) => article.types === "mustread"
          );
          setMustReadArticle(filtered);
        }
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
        const response = await apiClient.get("/articles/");
        if (response.data.results){
          const filtered = response.data.results.filter(
            (article) => article.types === "dontmiss"
          );
          setDontMissArticle(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading1(false);
      }
    };
    fetchArticle();
  }, []);

  return (
    <div className="w-full bg-gradient-to-l from-pink-50 to-blue-50 md:py-14 mt-0">
      <div className="w-11/12 mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-pink-500" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Must Read
            </h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base ml-9">
            Essential stories you can't miss
          </p>
        </div>

        {Loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-8">
            {/* Left Side - NewsCards with Scroll */}
            <div className="w-full lg:w-2/3">
              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 overflow-y-auto pr-2"
                style={{
                  maxHeight: "800px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#ec4899 #f1f1f1",
                }}
              >
                {mustReadarticles && mustReadarticles.length > 0 ? (
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
            <div className="w-full lg:w-1/3 space-y-6">
              {/* Stay Connected Section */}
              <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-lg p-6 border border-pink-100 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-pink-600" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Stay Connected
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Follow us on social media for latest updates
                </p>
                <SocialMedia />
              </div>

              {/* Don't Miss Section with Scroll */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Don't Miss
                  </h3>
                </div>

                {Loading1 ? (
                  <div className="flex justify-center items-center h-48">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                  </div>
                ) : (
                  <div
                    className="overflow-y-auto pr-2 space-y-3"
                    style={{
                      maxHeight: "380px",
                      scrollbarWidth: "thin",
                      scrollbarColor: "#ec4899 #f1f1f1",
                    }}
                  >
                    {dontMissarticles && dontMissarticles.length > 0 ? (
                      dontMissarticles.map((article) => (
                        <SideNewsCard key={article.id} article={article} />
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-8 text-sm sm:text-base">
                        No articles available
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MustRead;
