import B from "../../assets/Breaking News.jpg";

const Secondary = ({ article, onClick }) => {
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
            src={B}
            alt="Default"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <span className="bg-blue-600 px-3 py-1 text-xs font-medium rounded">
              {article.category.name}
            </span>
            <h3 className="text-lg font-bold mt-2">
              {article.headline.slice(0, 40)}...
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Secondary;