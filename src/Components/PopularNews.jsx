import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { ChevronLeft, ChevronRight } from "lucide-react";
import apiClient from "../Services/apiClient";
import PopularCard from "./PopularCard";

const PopularNews = () => {
  const [articles, setArticle] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/articles/");
        if (response.data.results){
          const filtered = response.data.results.filter(
            (article) => article.types === "popular"
          );
          setArticle(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white py-10 sm:py-14">
      <div className="w-11/12 mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full"></div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Popular News
            </h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base ml-4">
            Trending stories everyone's talking about
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {Loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          ) : articles.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow]}
              spaceBetween={20}
              slidesPerView={1}
              effect="coverflow"
              coverflowEffect={{
                rotate: 15,
                stretch: 0,
                depth: 150,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                  coverflowEffect: {
                    rotate: 10,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                  },
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                  coverflowEffect: {
                    rotate: 8,
                    stretch: 0,
                    depth: 80,
                    modifier: 1,
                  },
                },
              }}
              className="pb-16"
            >
              {articles.map((article) => (
                <SwiperSlide key={article.id}>
                  <div className="h-full">
                    <PopularCard article={article} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles available</p>
            </div>
          )}

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute -left-4 sm:left-0 top-1/3 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl hover:bg-pink-50 rounded-full p-2 sm:p-3 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-1">
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
          </button>

          <button className="swiper-button-next-custom absolute -right-4 sm:right-0 top-1/3 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl hover:bg-pink-50 rounded-full p-2 sm:p-3 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-1">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularNews;
