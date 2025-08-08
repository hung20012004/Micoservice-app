import React, { useState } from "react";
import {
  FaFilter,
  FaSearchLocation,
  AiOutlineClose,
  BiSort,
} from "../Collection/ReactIconsCollection";
import { CartState } from "../Context/CartContext";

function Filters() {
  const {
    fruitDispatch,
    fruitState: { sort, byRating, byVitaminC, byVitaminB6, byPotassium },
  } = CartState();
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      {!showFilter ? (
        <div className="mb-8">
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center space-x-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl px-6 py-3 shadow-sm hover:shadow-md transition-all duration-200 group"
          >
            <FaFilter className="text-green-600 group-hover:text-green-700" fontSize="20px" />
            <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900">
              Filters
            </span>
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 h-fit">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <FaFilter className="text-green-600" fontSize="20px" />
              <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            </div>
            <button
              onClick={() => setShowFilter(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <AiOutlineClose className="text-gray-400 hover:text-gray-600" fontSize="20px" />
            </button>
          </div>

          <div className="space-y-8">
            <div className="border-b border-gray-100 pb-6">
              <div className="flex items-center space-x-2 mb-4">
                <BiSort className="text-green-600" fontSize="20px" />
                <h3 className="text-lg font-semibold text-gray-700">Sort By Price</h3>
              </div>
              <div className="space-y-3 ml-2">
                <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="price-sort"
                    className="w-4 h-4 text-green-600 focus:ring-green-500 focus:ring-2"
                    onChange={() => {
                      fruitDispatch({
                        type: "SORT_BY_PRICE",
                        payload: "LowToHigh",
                      });
                    }}
                    checked={sort === "LowToHigh"}
                  />
                  <span className="text-gray-700">Low to High</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="price-sort"
                    className="w-4 h-4 text-green-600 focus:ring-green-500 focus:ring-2"
                    onChange={() => {
                      fruitDispatch({
                        type: "SORT_BY_PRICE",
                        payload: "HighToLow",
                      });
                    }}
                    checked={sort === "HighToLow"}
                  />
                  <span className="text-gray-700">High to Low</span>
                </label>
              </div>
            </div>

            <div className="border-b border-gray-100 pb-6">
              <div className="flex items-center space-x-2 mb-4">
                <FaSearchLocation className="text-green-600" fontSize="20px" />
                <h3 className="text-lg font-semibold text-gray-700">Sort By Location</h3>
              </div>
              <select 
                name="location" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white"
              >
                <option value="">Select Location</option>
                <option value="Allahabad">Allahabad</option>
                <option value="Nashik">Nashik</option>
                <option value="Gir">Gir</option>
                <option value="Tezpur">Tezpur</option>
              </select>
            </div>

            <div className="border-b border-gray-100 pb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Nutritional Benefits</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 focus:ring-green-500 focus:ring-2 rounded"
                    checked={byVitaminC}
                    onChange={() => {
                      fruitDispatch({
                        type: "VITAMIN_C",
                      });
                    }}
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700">Rich in Vitamin C</span>
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Immunity</span>
                  </div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 focus:ring-green-500 focus:ring-2 rounded"
                    checked={byVitaminB6}
                    onChange={() => {
                      fruitDispatch({
                        type: "VITAMIN_B6",
                      });
                    }}
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700">Rich in Vitamin B6</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Brain Health</span>
                  </div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 focus:ring-green-500 focus:ring-2 rounded"
                    checked={byPotassium}
                    onChange={() => {
                      fruitDispatch({
                        type: "POTASSIUM",
                      });
                    }}
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700">Rich in Potassium</span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Heart Health</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  fruitDispatch({
                    type: "CLEAR_FILTERS",
                  });
                }}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Filters;