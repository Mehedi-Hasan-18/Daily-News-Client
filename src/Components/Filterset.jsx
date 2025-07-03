import React from "react";

const Filterset = ({
  categories,
  selectedCategory,
  handleCategoryChange,
  searchQuery,
  handleSearchQuery,
}) => {
  return (
    <div className="mt-8 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Category Filter */}
      <div className="bg-white p-4 rounded-lg shadow">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          className="w-full p-2 border rounded-md"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchQuery(e.target.value)}
          placeholder="Search News..."
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>
  );
};

export default Filterset;
