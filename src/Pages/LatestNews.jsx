import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import DefaultImage from "../assets/Default_Image.webp";

const LatestNews = ({ article }) => {
  const formattedDate = (date) => format(new Date(date), "dd MMM yyyy, h:mm a");
  const navigate = useNavigate();

  const handleArticleDetails = (id) => {
    navigate(`/articles/${id}`);
  };

  const imageCount = article.images?.length || 0;
  const firstImage = article.images?.[0]?.image || DefaultImage;

  return (
    <div className="group cursor-pointer transition-all duration-300 hover:shadow-xl rounded-lg overflow-hidden bg-white">
      {/* Image Container with Badge */}
      <div
        onClick={() => handleArticleDetails(article.id)}
        className="relative overflow-hidden"
      >
        <img
          className="w-full h-[197px] object-cover transition-transform duration-300 group-hover:scale-105"
          src={firstImage}
          alt={article.headline}
        />

        {/* Image Count Badge */}
        {imageCount > 1 && (
          <div className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {imageCount}
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="p-4">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="bg-black text-white px-3 py-1 text-sm font-semibold uppercase tracking-wide inline-block transition-colors duration-300 group-hover:bg-blue-500">
            {article.category.name}
          </span>
        </div>

        {/* Headline */}
        <h3
          onClick={() => handleArticleDetails(article.id)}
          className="text-xl font-bold mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-blue-500"
        >
          {article.headline}
        </h3>

        {/* Meta Information */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <span className="font-semibold text-gray-900">
            {article.author.name}
          </span>
          <span className="text-gray-400">•</span>
          <span>{formattedDate(article.created_at)}</span>
        </div>

        {/* Read More Link */}
        <Link
          to={`/articles/${article.id}`}
          className="inline-flex items-center text-red-500 font-semibold hover:text-red-600 transition-colors duration-300"
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default LatestNews;
