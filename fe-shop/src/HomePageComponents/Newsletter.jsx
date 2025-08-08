import React from "react";

function Newsletter() {
  return (
    <div className="bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between overflow-hidden">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 relative h-auto flex items-center justify-center">
            <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl p-8">
              <img
                src="/images/leechiView.png"
                alt="Newsletter subscription"
                className="h-64 w-64 object-cover rounded-lg"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/2 md:pl-12 space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Subscribe <span className="text-green-600">Newsletter</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Stay updated with our latest offers and fresh fruit arrivals. Get exclusive deals delivered to your inbox.
              </p>
            </div>
            
            <div className="flex items-stretch rounded-lg overflow-hidden border border-gray-200">
              <input
                className="flex-1 bg-gray-50 text-gray-800 px-6 py-4 text-base border-none outline-none focus:bg-white transition-colors"
                type="email"
                placeholder="Enter your email address"
              />
              <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-medium uppercase transition-all duration-200 transform hover:scale-105 active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
