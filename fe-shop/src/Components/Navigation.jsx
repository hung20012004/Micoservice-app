import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthProvider";
import { useLogout } from "../hooks/useLogout";
import { CartState } from "../Context/CartContext";
import {
  AiOutlineShoppingCart,
  BiHomeCircle,
  BiUser,
  GiGrapes,
  TbMapSearch,
} from "../Collection/ReactIconsCollection";

function Navigation() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { login, isLogin } = useContext(AuthContext);
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
    isLogin(false);
  };

  const {
    state: { cart },
  } = CartState();

  const totalItems =
    cart.length > 0
      ? cart[0].items.reduce((total, item) => total + item.unit, 0)
      : 0;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="container flex flex-wrap justify-between items-center mx-auto max-w-7xl">
        <Link to="/" className="flex items-center space-x-2 group">
          <img
            src="/images/freshfruit_logo.png"
            alt="Fruity Logo"
            className="h-12 sm:h-16 transition-transform group-hover:scale-105"
          />
          <span className="text-2xl font-bold text-green-600 font-mono tracking-tight">
            Fruity
          </span>
        </Link>

        <div className="flex items-center space-x-4 md:order-2">
          {login ? (
            <Link to="cart">
              <button className="relative bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
                <div className="flex items-center space-x-2">
                  <AiOutlineShoppingCart size={20} />
                  <span className="font-semibold">{totalItems}</span>
                </div>
              </button>
            </Link>
          ) : (
            <Link to="sign-up">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
                Sign Up
              </button>
            </Link>
          )}

          <button
            type="button"
            className="inline-flex items-center p-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${
            navbarOpen ? "flex" : "hidden"
          } flex-col md:flex md:flex-row md:items-center md:space-x-8 w-full md:w-auto md:order-1`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 space-y-2 md:space-y-0">
            <Link to="/">
              <li className="group">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 cursor-pointer">
                  <BiHomeCircle size={24} />
                  <span className="font-medium">Home</span>
                </div>
              </li>
            </Link>

            {login && (
              <Link to="/me">
                <li className="group">
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 cursor-pointer">
                    <BiUser size={24} />
                    <span className="font-medium">Profile</span>
                  </div>
                </li>
              </Link>
            )}

            <Link to="/fruits">
              <li className="group">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 cursor-pointer">
                  <GiGrapes size={24} />
                  <span className="font-medium">Fruits</span>
                </div>
              </li>
            </Link>

            {login && (
              <Link to="/orders">
                <li className="group">
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 cursor-pointer">
                    <TbMapSearch size={24} />
                    <span className="font-medium">Orders</span>
                  </div>
                </li>
              </Link>
            )}

            <li className="group">
              {!login ? (
                <Link to="/sign-in">
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 font-medium">
                    Login
                  </button>
                </Link>
              ) : (
                <button
                  onClick={handleClick}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
