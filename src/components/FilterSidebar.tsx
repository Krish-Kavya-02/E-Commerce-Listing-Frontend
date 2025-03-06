import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, SlidersHorizontal } from 'lucide-react';

const FilterSidebar: React.FC = () => {
  const { filterOptions, updateFilterOptions, categories } = useShop();
  const [searchInput, setSearchInput] = useState(filterOptions.searchQuery);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilterOptions({ searchQuery: searchInput });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, updateFilterOptions]);

  const handlePriceChange = (min: number, max: number) => {
    updateFilterOptions({ minPrice: min, maxPrice: max });
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleMobileFilter}
          className="flex items-center justify-center w-full py-2 bg-indigo-600 text-white rounded-md"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          {isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filter sidebar - responsive */}
      <div className={`${isMobileFilterOpen ? 'block' : 'hidden'} md:block`}>
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">Search</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="radio"
                  id={category}
                  name="category"
                  checked={filterOptions.category === category}
                  onChange={() => updateFilterOptions({ category })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={category} className="ml-2 text-gray-700 capitalize">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">Price Range</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">${filterOptions.minPrice}</span>
              <span className="text-gray-600">${filterOptions.maxPrice}</span>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="min-price" className="block text-sm text-gray-600 mb-1">
                  Min
                </label>
                <input
                  type="number"
                  id="min-price"
                  value={filterOptions.minPrice}
                  onChange={(e) => handlePriceChange(Number(e.target.value), filterOptions.maxPrice)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="max-price" className="block text-sm text-gray-600 mb-1">
                  Max
                </label>
                <input
                  type="number"
                  id="max-price"
                  value={filterOptions.maxPrice}
                  onChange={(e) => handlePriceChange(filterOptions.minPrice, Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">Sort By</h2>
          <select
            value={filterOptions.sortBy}
            onChange={(e) => updateFilterOptions({ sortBy: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;