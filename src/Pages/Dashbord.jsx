import React, { useEffect, useState } from "react";
import { FiPackage, FiTag, FiUser } from "react-icons/fi";
import { FaNewspaper } from "react-icons/fa";
import apiClient from "../Services/apiClient";
import authApiClient from "../Services/authApiClient";
import AllNewsCard from "../Components/AllNewsCard";
import AllCategoryCard from "../Components/AllCategoryCard";
import AllUserCard from "../Components/AllUserCard";
import AllAuthor from "../Components/AllAuthor";

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [allNewss, setAllNews] = useState([]);
  const [category, setCategory] = useState([]);
  const [users, setUser] = useState([]);
  const [author, setAuthor] = useState([]);
  const [activeCard, setActiveCard] = useState("Total News");
  const [loading, setLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [news1, news2, news3, news4, authors] = await Promise.all([
          apiClient.get("/articles"),
          apiClient.get("/dontmiss-articles"),
          apiClient.get("/mustread-articles"),
          apiClient.get("/popular-articles"),
          apiClient.get("/authors"),
        ]);

        const totalNews =
          news1.data.results.length +
          news2.data.results.length +
          news3.data.results.length +
          news4.data.results.length;
        const allNewsArray = [
          ...news1.data.results.map((item) => ({ ...item })),
          ...news2.data.results.map((item) => ({ ...item })),
          ...news3.data.results.map((item) => ({ ...item })),
          ...news4.data.results.map((item) => ({ ...item })),
        ];

        setNews(totalNews);
        setAllNews(allNewsArray);
        setAuthor(authors.data.results);
        
        setTimeout(() => setAnimateCards(true), 100);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    apiClient.get("/categories").then((res) => setCategory(res.data.results));
  }, []);

  useEffect(() => {
    authApiClient.get("/auth/users").then((res) => setUser(res.data.results));
  }, []);

  const handleclick = (cardName) => {
    setActiveCard(cardName);
  };

  const stats = [
    {
      name: "Total News",
      value: news,
      icon: FaNewspaper,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconBg: "bg-gradient-to-br from-blue-100 to-cyan-100",
      textColor: "text-blue-600",
    },
    {
      name: "Total Category",
      value: category.length,
      icon: FiTag,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconBg: "bg-gradient-to-br from-purple-100 to-pink-100",
      textColor: "text-purple-600",
    },
    {
      name: "Total User",
      value: users.length,
      icon: FiUser,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      iconBg: "bg-gradient-to-br from-green-100 to-emerald-100",
      textColor: "text-green-600",
    },
    {
      name: "Total Author",
      value: author.length,
      icon: FiUser,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      iconBg: "bg-gradient-to-br from-orange-100 to-red-100",
      textColor: "text-orange-600",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Monitor your content performance and statistics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isActive = activeCard === stat.name;

            return (
              <div
                key={stat.name}
                onClick={() => handleclick(stat.name)}
                className={`group relative cursor-pointer transition-all duration-500 ${
                  animateCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                    isActive
                      ? "border-pink-400 scale-105"
                      : "border-transparent hover:border-gray-200"
                  } overflow-hidden`}
                >
                  {/* Background Gradient Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-400 opacity-10 rounded-full blur-2xl"></div>
                  )}

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`${stat.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-7 h-7 ${stat.textColor}`} />
                    </div>

                    {/* Content */}
                    <div>
                      <p className="text-gray-500 text-sm font-medium mb-1">
                        {stat.name}
                      </p>
                      <p
                        className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      >
                        {stat.value}
                      </p>
                    </div>

                    {/* Active Badge */}
                    {isActive && (
                      <div className="absolute top-4 right-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Accent Line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transform origin-left transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                {activeCard === "Total News" && <FaNewspaper className="w-5 h-5" />}
                {activeCard === "Total Category" && <FiTag className="w-5 h-5" />}
                {(activeCard === "Total User" || activeCard === "Total Author") && (
                  <FiUser className="w-5 h-5" />
                )}
              </span>
              {activeCard}
            </h2>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeCard === "Total News" && (
              <AllNewsCard allnews={allNewss} setAllNews={setAllNews} />
            )}
            {activeCard === "Total Category" && (
              <AllCategoryCard allCategory={category} setCategory={setCategory} />
            )}
            {activeCard === "Total User" && (
              <AllUserCard allUser={users} setUser={setUser} />
            )}
            {activeCard === "Total Author" && (
              <AllAuthor allAuthor={author} setAuthor={setAuthor} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;