import React from "react";

function StatSection() {
  const stats = [
    { number: "150+", label: "Global Franchise", icon: "🌍" },
    { number: "97%", label: "Happy Customer", icon: "😊" },
    { number: "100%", label: "Organic Product", icon: "🌱" },
    { number: "10M+", label: "Monthly Sales", icon: "📈" }
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
            <div className="bg-gradient-to-br from-green-100 to-lime-100 rounded-2xl p-8">
              <img 
                src="/images/blood_orange.png" 
                alt="Fresh Orange" 
                className="h-64 w-64 object-cover rounded-lg"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/2 md:pl-12 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Eat a banana for a <span className="text-green-600">Healthy</span> snack
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Discover the nutritional benefits of our fresh, organic fruits that promote a healthy lifestyle.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                      {index + 1}
                    </div>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatSection;
