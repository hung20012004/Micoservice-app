import React, { useState, useEffect } from "react";
import { MdStarRate } from "react-icons/md";
import { CartState } from "../Context/CartContext";

function HomeProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoadStates, setImageLoadStates] = useState({});
  const [addingToCart, setAddingToCart] = useState({});
  
  const { addToCartAPI } = CartState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:80');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data.products || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    setAddingToCart(prev => ({ ...prev, [product._id]: true }));
    await addToCartAPI(product);
    setAddingToCart(prev => ({ ...prev, [product._id]: false }));
  };

  const handleImageLoad = (productId) => {
    setImageLoadStates(prev => ({
      ...prev,
      [productId]: { loaded: true, error: false }
    }));
  };

  const handleImageError = (productId) => {
    setImageLoadStates(prev => ({
      ...prev,
      [productId]: { loaded: true, error: true }
    }));
  };

  const getImageSrc = (product) => {
    const imageState = imageLoadStates[product._id];
    if (imageState?.error) {
      return "/images/default-product.png";
    }
    return product.banner || "/images/default-product.png";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-6"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Loading Fresh Products</h3>
            <p className="text-gray-600">Getting the best deals for you...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-6">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-6">📦</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Products Available</h3>
            <p className="text-gray-600">Check back later for fresh arrivals!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Featured <span className="text-green-600">Products</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our handpicked selection of premium fresh fruits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product._id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border border-gray-100"
            >
              <div className="relative h-48 bg-gradient-to-br from-green-50 to-lime-50 flex items-center justify-center overflow-hidden">
                <div className="absolute top-3 right-3 z-10">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.available ? 'Available' : 'Out of Stock'}
                  </span>
                </div>
                
                <img 
                  className="w-32 h-32 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110" 
                  src={getImageSrc(product)}
                  alt={product.name}
                  onLoad={() => handleImageLoad(product._id)}
                  onError={() => handleImageError(product._id)}
                />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <MdStarRate key={index} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                    {product.type}
                  </span>
                </div>
                
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-green-600">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.unit > 1 ? `per ${product.unit}` : 'each'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {product.desc}
                </p>
                
                <button 
                  className={`w-full font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 ${
                    product.available 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.available || addingToCart[product._id]}
                >
                  {addingToCart[product._id] ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <span>{product.available ? 'Add to Cart' : 'Out of Stock'}</span>
                      {product.available && <span className="text-lg">🛒</span>}
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <span>🎉</span>
            <span>Showing {products.length} amazing products</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeProducts;