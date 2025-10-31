import React from "react";
import A from "../assets/A.jpg";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";

const SideNewsCard = ({ article }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/articles/${id}`);
  };

  if (!article) return <div>Loading...........</div>;

  const formattedDate = format(new Date(article.created_at), "MMM dd");

  return (
    <div
      onClick={() => handleClick(article.id)}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:border-pink-200 border border-gray-100 cursor-pointer p-4"
    >
      <div className="flex gap-4">
        {/* Image */}
        <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-200">
          {article.images && article.images.length > 0 ? (
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              src={article.images[0]?.image}
              alt={article.headline}
            />
          ) : (
            <img className="w-full h-full object-cover" src={A} alt="default" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-pink-600 transition-colors mb-2">
              {article.headline.slice(0, 50)}...
            </h4>

            {/* Category Badge */}
            <span className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 px-2.5 py-1 text-xs font-semibold text-white rounded-full transition-all duration-200">
              {article.category.name}
            </span>
          </div>

          {/* Date and Arrow */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-pink-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNewsCard;
