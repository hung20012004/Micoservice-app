import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between xl:justify-around min-w-full">
          <div className="w-2/3 space-y-6">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-800 font-semibold text-sm xl:text-lg rounded-full">
              FRESH FRUITS FROM ALL OVER INDIA
            </span>
            
            <div className="space-y-2">
              <h1 className="text-5xl font-bold text-green-600 xl:text-8xl leading-tight">
                Eat as
              </h1>
              <h1 className="text-5xl font-bold text-green-600 xl:text-8xl leading-tight">
                you want
              </h1>
            </div>
            
            <p className="text-lg text-gray-700 xl:text-xl pt-4 max-w-2xl leading-relaxed">
              Experience the finest selection of fresh, organic fruits delivered straight to your doorstep.
            </p>
            
            <div className="flex items-center flex-wrap gap-4 pt-6">
              <Link to="fruits">
                <button className="group px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center space-x-2">
                  <span>Add to Cart</span>
                  <span className="text-lg">🛒</span>
                </button>
              </Link>
              <button className="px-8 py-3 bg-white hover:bg-gray-50 text-green-600 font-medium rounded-lg border-2 border-green-500 transition-all duration-200 transform hover:scale-105 active:scale-95">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
