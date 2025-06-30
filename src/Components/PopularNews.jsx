import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import apiClient from "../Services/apiClient";
import PopularCard from "./PopularCard";

const PopularNews = () => {
  const [articles, setArticle] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/popular-articles/");
        setArticle(response.data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, []);
  return (
    <div className="w-11/12  mx-auto mb-6 sm:mb-10">
      <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-3 py-2 sm:px-4 text-sm sm:text-base font-semibold shadow-md inline-block rounded-sm">
        Popular News
      </span>
      <Swiper
        modules={[Navigation]}
        spaceBetween={15}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation
        className="mt-5 mb-5 px-5 ml-5 container"
      >
        {articles.map((article) => (
          <SwiperSlide key={article.id}>
            <PopularCard key={article.id} article={article}></PopularCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularNews;
