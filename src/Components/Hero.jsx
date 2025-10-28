import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../Services/apiClient";
import Featured from "./Hero/Featured";
import Secondary from "./Hero/Secondary";
import SmallCard from "./Hero/SmallCard";
import C from "../assets/C.jpg";
import D from "../assets/D.jpg";
import { CircleLoader, BeatLoader, RingLoader } from "react-spinners";

const Hero = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/articles/");
        setArticles(response.data.results);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <CircleLoader color="#ec4899" size={50} />
      </div>
    );
  }

  if (articles.length < 4) {
    return (
      <div className="text-center py-10">Not enough articles available.</div>
    );
  }

  const handleClick = (id) => {
    navigate(`/articles/${id}/`);
  };

  const topArticles = articles.slice(0, 4);

  return (
    <div className="w-11/12 mt-5 mx-auto min-h-screen">
      {/* Header Section */}
      <div className="mb-6 flex items-center relative overflow-hidden">
        <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-2 font-semibold shadow-md relative whitespace-nowrap">
          Latest News
        </span>
        <div className="ml-4 overflow-hidden w-full">
          <span className="text-gray-700 font-medium inline-block animate-marquee whitespace-nowrap">
            Stay updated with the latest breaking news and stories
          </span>
        </div>
      </div>

      {/* Hero Layout */}
      <div className="flex flex-col md:flex-row md:h-[460px] gap-4">
        {/* Left Featured Article */}
        <div className="md:w-1/2 w-full h-full">
          <Featured
            article={topArticles[0]}
            onClick={() => handleClick(topArticles[0].id)}
          />
        </div>

        {/* Right Side Articles */}
        <div className="md:w-1/2 w-full h-full flex flex-col gap-4">
          {/* Top Right Article */}
          <div className="h-1/2">
            <Secondary
              article={topArticles[1]}
              onClick={() => handleClick(topArticles[1].id)}
            />
          </div>

          {/* Bottom Right - Two Small Articles */}
          <div className="flex flex-col md:flex-row h-1/2 gap-4">
            <div className="w-full md:w-1/2">
              <SmallCard
                article={topArticles[2]}
                onClick={() => handleClick(topArticles[2].id)}
                defaultImage={C}
              />
            </div>
            <div className="w-full md:w-1/2">
              <SmallCard
                article={topArticles[3]}
                onClick={() => handleClick(topArticles[3].id)}
                defaultImage={D}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
