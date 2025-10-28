import React, { useEffect, useState } from "react";
import { FiPackage, FiTag, FiUser } from "react-icons/fi";
import StatCard from "../Components/Dashboard/StatCard";
import { FaNewspaper } from "react-icons/fa";
import apiClient from "../Services/apiClient";
import authApiClient from "../Services/authApiClient";
import AllNewsCard from "../Components/AllNewsCard";
import AllCategoryCard from "../Components/AllCategoryCard";
import AllUserCard from "../Components/AllUserCard";
import AllAuthor from "../Components/AllAuthor";

const Dashbord = () => {
  const [news, setNews] = useState([]);
  //   const [latestnews, setLatestnews] = useState([]);
  const [allNewss, setAllNews] = useState([]);
  const [category, setCategory] = useState([]);
  const [users, setUser] = useState([]);
  const [author, setAuthor] = useState([]);
  const [activeCard, setActiveCard] = useState("Total News");
  useEffect(() => {
    const fetchData = async () => {
      try {
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
        // setLatestnews(news1.data);
        setAuthor(authors.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    apiClient.get("/categories").then((res) => setCategory(res.data));
  }, []);

  useEffect(() => {
    authApiClient.get("/auth/users").then((res) => setUser(res.data));
  }, []);

  const handleclick = (cardName) => {
    setActiveCard(cardName);
  };

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          onClick={() => handleclick("Total News")}
          icon={FaNewspaper}
          title="Total News"
          value={news}
        />
        <StatCard
          onClick={() => handleclick("Total Category")}
          icon={FiTag}
          title="Total Category"
          value={category.length}
        />
        <StatCard
          onClick={() => handleclick("Total User")}
          icon={FiUser}
          title="Total User"
          value={users.length}
        />
        <StatCard
          onClick={() => handleclick("Total Author")}
          icon={FiUser}
          title="Total Author"
          value={author.length}
        />
      </div>

      {activeCard === "Total News" && (
        <AllNewsCard allnews={allNewss} setAllNews={setAllNews}></AllNewsCard>
      )}
      {activeCard === "Total Category" && (
        <AllCategoryCard
          allCategory={category}
          setCategory={setCategory}
        ></AllCategoryCard>
      )}
      {activeCard === "Total User" && (
        <AllUserCard allUser={users} setUser={setUser}></AllUserCard>
      )}
      {activeCard === "Total Author" && (
        <AllAuthor allAuthor={author} setAuthor={setAuthor}></AllAuthor>
      )}
    </div>
  );
};

export default Dashbord;
