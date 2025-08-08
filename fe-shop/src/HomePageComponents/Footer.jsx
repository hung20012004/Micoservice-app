import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/images/freshfruit_logo.png"
                alt="Fruity Logo"
                className="h-12 sm:h-16 filter brightness-0 invert"
              />
              <span className="text-2xl font-bold text-green-400 font-mono">
                Fruity
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fresh, organic fruits delivered straight to your door. Quality you can taste, freshness you can trust.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fruity</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fruit Farm</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Github</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Fruity. All rights reserved. Made with 💚 for fruit lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
