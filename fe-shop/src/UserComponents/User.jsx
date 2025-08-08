import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaList, FaHeart, FaClock, FaDollarSign } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

function User() {
  const { dispatch, setAuth, isLogin } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("http://localhost:80/customer/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Failed to fetch user profile");
      }

      setUserData(json);
      setAuth(json); // Update auth context with user data
      isLogin(true); // Set login state
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="text-red-400 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Profile</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={fetchUser}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition-colors"
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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4">
            My <span className="text-green-600">Profile</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            View and manage your account details
          </p>
        </div>

        {/* User Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          {/* Profile Info */}
          <div className="bg-gradient-to-r from-green-50 to-lime-50 rounded-lg p-6 mb-6 border border-green-100">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-sm">
                <FaUser className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{userData?.name || "User Name"}</h2>
                <p className="text-sm text-gray-600 capitalize">{userData?.phone || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FaEnvelope className="text-gray-400" />
              <span>{userData?.email || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
              <FaClock className="text-gray-400" />
              <span>Joined: {formatDate(userData?.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
              <FaClock className="text-gray-400" />
              <span>Last Updated: {formatDate(userData?.updatedAt)}</span>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-gradient-to-r from-green-50 to-lime-50 rounded-lg p-6 mb-6 border border-green-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Address</h3>
            {userData?.address && userData.address.length > 0 ? (
              userData.address.map((addr) => (
                <div key={addr._id} className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span>
                    {addr.street}, {addr.city}, {addr.postalCode}, {addr.country}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No address provided</p>
            )}
          </div>

          {/* Orders Summary */}
          <div className="bg-gradient-to-r from-green-50 to-lime-50 rounded-lg p-6 mb-6 border border-green-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h3>
            {userData?.orders && userData.orders.length > 0 ? (
              <div className="space-y-4">
                {userData.orders.slice(0, 3).map((order) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between text-sm text-gray-600"
                  >
                    <div className="flex items-center space-x-2">
                      <FaList className="text-gray-400" />
                      <span>Order #{order._id.slice(-8).toUpperCase()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaDollarSign className="text-gray-400" />
                      <span>${parseFloat(order.amount).toFixed(2)}</span>
                      <FaClock className="text-gray-400 ml-2" />
                      <span>{formatDate(order.date)}</span>
                    </div>
                  </div>
                ))}
                {userData.orders.length > 3 && (
                  <p className="text-sm text-gray-500">
                    +{userData.orders.length - 3} more orders
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No orders found</p>
            )}
          </div>

          {/* Wishlist Summary */}
          <div className="bg-gradient-to-r from-green-50 to-lime-50 rounded-lg p-6 border border-green-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Wishlist</h3>
            {userData?.wishlist && userData.wishlist.length > 0 ? (
              <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                {userData.wishlist.map((item, index) => (
                  <div key={index} className="flex-shrink-0">
                    <img
                      src={item.banner || "/placeholder-product.jpg"}
                      alt={item.name || "Product"}
                      className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      onError={(e) => {
                        e.target.src = "/placeholder-product.jpg";
                      }}
                    />
                    <p className="text-xs font-medium text-gray-700 truncate max-w-20 mt-2">
                      {item.name || "Unknown"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Your wishlist is empty</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;