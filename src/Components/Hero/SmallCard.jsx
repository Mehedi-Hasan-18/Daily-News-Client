import C from "../../assets/C.jpg";
import D from "../../assets/D.jpg";

const SmallCard = ({ article, onClick, defaultImage = C }) => {
  return (
    <div
      onClick={onClick}
      className="w-full h-full cursor-pointer"
    >
      <div className="relative w-full h-full group overflow-hidden rounded-lg shadow-lg">
        {article.images?.length > 0 ? (
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={article.images[0].image}
            alt="Article"
          />
        ) : (
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={defaultImage}
            alt="Default"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <span className="bg-green-600 px-2 py-1 text-xs font-medium rounded">
              {article.category.name}
            </span>
            <h4 className="text-sm font-bold mt-2">
              {article.headline.slice(0, 35)}...
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;