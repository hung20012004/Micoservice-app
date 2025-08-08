import React from "react";

function FeaturePrompt() {
  const features = [
    {
      step: "1",
      title: "Order Your Fruit",
      description: "Browse our fresh selection and place your order online with ease.",
      icon: "🛒"
    },
    {
      step: "2", 
      title: "Delivery and Pickup",
      description: "Get your fresh fruits delivered or pick them up at your convenience.",
      icon: "🚚"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between xl:justify-around space-y-8 xl:space-y-0 flex-wrap">
          <div className="w-full xl:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Our purpose is to deliver <span className="text-green-600">fresh fruit</span> to you
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
              We're committed to bringing you the freshest, highest quality fruits with convenient delivery options.
            </p>
          </div>
          
          <div className="w-full xl:w-1/2 space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-lg">
                      {feature.step}
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                        {feature.title}
                      </h3>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturePrompt;
