import React from "react";

function ProductsGallery() {
  const products = [
    { src: "/images/appleView.png", alt: "Fresh Apples", title: "Premium Apples", badge: "Popular" },
    { src: "/images/mangoView.png", alt: "Ripe Mangoes", title: "Sweet Mangoes", badge: "Seasonal" },
    { src: "/images/grapeView.png", alt: "Fresh Grapes", title: "Juicy Grapes", badge: "Fresh" },
    { src: "/images/leechiView.png", alt: "Fresh Leechi", title: "Exotic Leechi", badge: "Exotic" },
    { src: "/images/papayaView.png", alt: "Ripe Papaya", title: "Tropical Papaya", badge: "Tropical" },
    { src: "/images/bananaView.png", alt: "Fresh Bananas", title: "Golden Bananas", badge: "Daily" }
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Fresh <span className="text-green-600">Collection</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the finest selection of fresh, organic fruits handpicked for quality and taste
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {products.map((product, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border border-gray-100"
            >
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-green-50 to-lime-50 flex items-center justify-center">
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {product.badge}
                  </span>
                </div>
                <img
                  src={product.src}
                  alt={product.alt}
                  className="w-20 h-20 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-sm group-hover:text-green-600 transition-colors text-center">
                  {product.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <span>🎉</span>
            <span>Featuring {products.length} premium fruit varieties</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductsGallery;
