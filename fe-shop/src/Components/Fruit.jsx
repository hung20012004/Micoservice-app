import React, { useState } from "react";
import { MdStarRate } from "../Collection/ReactIconsCollection";
import { CartState } from "../Context/CartContext";

function Fruit({ fruit }) {
  const {
    state: { cart },
    addToCartAPI,
    removeFromCartAPI,
  } = CartState();

  const [isLoading, setIsLoading] = useState(false);

  // Tạo default rating nếu không có
  const rating = fruit.rating || 4;

  const handleAddToCart = async () => {
    setIsLoading(true);
    await addToCartAPI(fruit);
    setIsLoading(false);
  };

  const handleRemoveFromCart = async () => {
    setIsLoading(true);
    await removeFromCartAPI(fruit);
    setIsLoading(false);
  };

  const isInCart = cart.some((p) => p._id === fruit._id);

  return (
    <div className="group">
      <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            fruit.available 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {fruit.available ? 'Available' : 'Out of Stock'}
          </span>
        </div>

        {/* Product Image */}
        <div className="relative h-48 bg-gradient-to-br from-green-50 to-lime-50 flex items-center justify-center overflow-hidden">
          <img 
            className="h-40 w-40 object-contain transition-transform duration-300 group-hover:scale-110" 
            src={fruit.banner} 
            alt={fruit.name} 
          />
        </div>

        {/* Product Info */}
        <div className="p-6 space-y-4">
          {/* Product Name */}
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors">
            {fruit.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(Math.round(rating))].map((_, index) => (
                <MdStarRate key={index} className="text-yellow-400 text-sm" />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({rating})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-green-600">
              ${fruit.price}
            </span>
            {fruit.unit && (
              <span className="text-sm text-gray-500">per {fruit.unit}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {fruit.desc || "High quality product from trusted supplier"}
          </p>

          {/* Supplier Info */}
          {fruit.suplier && (
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Supplier: {fruit.suplier}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4">
            {isInCart ? (
              <button
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                onClick={handleRemoveFromCart}
                disabled={isLoading || !fruit.available}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Removing...</span>
                  </>
                ) : (
                  <>
                    <span>Remove from Cart</span>
                    <span className="text-lg">🗑️</span>
                  </>
                )}
              </button>
            ) : (
              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                onClick={handleAddToCart}
                disabled={isLoading || !fruit.available}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <span>Add to Cart</span>
                    <span className="text-lg">🛒</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fruit;