import React, { useState, useEffect } from "react";
import Filters from "../Components/Filters";
import Fruit from "../Components/Fruit";
import { CartState } from "../Context/CartContext";

function Fruits() {
  const {
    fruitState: { sort, byType, byPrice, byAvailability },
  } = CartState();

  const [fruits, setFruits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch fruits data
  useEffect(() => {
    const fetchFruitsDATA = async function () {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:80");
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setFruits(data.products || []);
        setCategories(data.categories || []);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFruitsDATA();
  }, []);

  const transformFruitsProducts = () => {
    // deep clone of fruits object
    const clone = JSON.parse(JSON.stringify(fruits));
    let sortedFruitProducts = clone;

    // sort the fruits in ascending & descending Order by price
    if (sort) {
      sortedFruitProducts = sortedFruitProducts.sort((fruitX, fruitY) => {
        return sort === "LowToHigh"
          ? fruitX.price - fruitY.price
          : fruitY.price - fruitX.price;
      });
    }

    // filter by fruit type
    if (byType && byType !== "all") {
      sortedFruitProducts = sortedFruitProducts.filter(fruit => fruit.type === byType);
    }

    // filter by availability
    if (byAvailability) {
      sortedFruitProducts = sortedFruitProducts.filter(fruit => fruit.available === true);
    }

    // filter by price range
    if (byPrice) {
      sortedFruitProducts = sortedFruitProducts.filter(fruit => {
        if (byPrice === "under200") return fruit.price < 200;
        if (byPrice === "200to500") return fruit.price >= 200 && fruit.price <= 500;
        if (byPrice === "over500") return fruit.price > 500;
        return true;
      });
    }

    return sortedFruitProducts;
  };

  const filteredProducts = transformFruitsProducts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading fresh products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
              <p className="text-gray-600">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4">
            Fresh <span className="text-green-600">Fruits</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our premium selection of fresh, organic fruits sourced directly from trusted farmers
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-green-600 font-semibold">{fruits.length}</span>
              <span className="text-gray-600">Total Products</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-green-600 font-semibold">{filteredProducts.length}</span>
              <span className="text-gray-600">Showing</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="xl:w-1/4">
            <div className="sticky top-8">
              <Filters categories={categories} />
            </div>
          </div>

          {/* Products Grid */}
          <div className="xl:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 text-8xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Products Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {byType && byType !== "all" ? `${byType} Products` : "All Products"}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
                    </span>
                    {sort && (
                      <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        {sort === "LowToHigh" ? "Price: Low to High" : "Price: High to Low"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((fruit) => (
                    <Fruit key={fruit._id} fruit={fruit} />
                  ))}
                </div>

                {/* Load More Button (if needed) */}
                {filteredProducts.length > 0 && (
                  <div className="text-center mt-12">
                    <div className="inline-flex items-center space-x-2 text-gray-500">
                      <span>🎉</span>
                      <span>You've seen all our amazing products!</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fruits;