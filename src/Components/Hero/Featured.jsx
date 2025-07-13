import A from "../../assets/A.jpg";

const Featured = ({ article, onClick }) => {
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
            src={A}
            alt="Default Article"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="mb-3">
              <span className="bg-pink-600 hover:bg-pink-700 px-3 py-1 text-sm font-medium rounded">
                {article.category.name || "Category"}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-2">
              {article.headline.slice(0, 50)}...
            </h2>
            <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {article.body.slice(0, 60)}...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;