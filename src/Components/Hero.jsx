import { useEffect, useState } from "react";
import A from "../assets/A.jpg";
import B from "../assets/Breaking News.jpg";
import C from "../assets/C.jpg";
import D from "../assets/D.jpg";
import apiClient from "../Services/apiClient";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [articles, setArticles] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/articles/");
        setArticles(response.data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, []);

  const navigate = useNavigate();
  const handleClick = (ids) => {
    navigate(`/articles/${ids}/`);
    console.log(ids);
  };

  if (Loading || articles.length === 0) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="w-11/12 mt-5 mx-auto min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 font-semibold shadow-md">
          Latest News
        </span>
        <span className="ml-4 text-gray-700 font-medium">
          Stay updated with the latest breaking news and stories
        </span>
      </div>

      {/* Hero Layout */}
      <div className="mt-5 flex flex-col lg:flex-row gap-4">
        {/* Left Featured Article */}
        <div
          onClick={() => handleClick(articles[0].id)}
          className="w-full lg:w-1/2 h-[350px] sm:h-[400px] lg:h-[450px]"
        >
          <div className="relative w-full h-full group overflow-hidden rounded-lg shadow-lg">
            {articles[0].images?.length > 0 ? (
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={articles[0].images[0].image}
                alt="Article"
              />
            ) : (
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={A}
                alt="Default Article"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="mb-3">
                  <span className="bg-pink-600 hover:bg-pink-700 px-3 py-1 text-sm font-medium">
                    {articles[0].category.name || "Category"}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-2">
                  {articles[0].headline.slice(0, 50)}...
                </h2>
                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {articles[0].body.slice(0, 60)}...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Articles */}
        <div className="w-full lg:w-1/2 h-[450px] flex flex-col gap-4">
          {/* Top Right Article */}
          <div
            onClick={() => handleClick(articles[2].id)}
            className="h-[200px] sm:h-[250px] relative group overflow-hidden rounded-lg shadow-lg"
          >
            {articles[2].images?.length > 0 ? (
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={articles[2].images[0].image}
                alt="Article"
              />
            ) : (
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={B}
                alt="Default"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <span className="bg-blue-600 px-3 py-1 text-xs font-medium">
                  {articles[2].category.name}
                </span>
                <h3 className="text-lg font-bold mt-2">
                  {articles[2].headline.slice(0, 40)}...
                </h3>
              </div>
            </div>
          </div>

          {/* Bottom Right - Two Small Articles */}
          <div className="flex flex-col sm:flex-row gap-4 h-[200px] sm:h-[250px]">
            {/* First Bottom Article */}
            <div
              onClick={() => handleClick(articles[5].id)}
              className="w-full sm:w-1/2 relative group overflow-hidden rounded-lg shadow-lg"
            >
              {articles[5]?.images?.length > 0 ? (
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={articles[5].images[0].image}
                  alt="Article"
                />
              ) : (
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={C}
                  alt="Default"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <span className="bg-green-600 px-2 py-1 text-xs font-medium">
                    {articles[3].category.name}
                  </span>
                  <h4 className="text-sm font-bold mt-2">
                    {articles[3].headline.slice(0, 35)}...
                  </h4>
                </div>
              </div>
            </div>

            {/* Second Bottom Article */}
            <div
              onClick={() => handleClick(articles[4].id)}
              className="w-full sm:w-1/2 relative group overflow-hidden rounded-lg shadow-lg"
            >
              {articles[4]?.images?.length > 0 ? (
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={articles[4].images[0].image}
                  alt="Article"
                />
              ) : (
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={D}
                  alt="Default"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <span className="bg-purple-600 px-2 py-1 text-xs font-medium">
                    {articles[4].category.name}
                  </span>
                  <h4 className="text-sm font-bold mt-2">
                    {articles[4].headline.slice(0, 35)}...
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
