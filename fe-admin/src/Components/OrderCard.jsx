import React, { useState, useCallback } from "react";
import { FaCalendarAlt, FaEye, FaDollarSign, FaBox, FaClock, FaShoppingBag, FaMapMarkerAlt } from "react-icons/fa";

function OrderCard({ order, onViewOrder, getStatusColor }) {
  const [imageErrors, setImageErrors] = useState(new Set());
  
  if (!order) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-100 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">⚠</span>
          </div>
          <div>
            <h3 className="font-bold text-lg text-red-800">Error</h3>
            <p className="text-red-600 text-sm">Order data is missing</p>
          </div>
        </div>
      </div>
    );
  }

  const handleImageError = useCallback((imageId) => {
    setImageErrors(prev => new Set(prev).add(imageId));
  }, []);

  const getImageSrc = useCallback((item, index) => {
    const imageId = item._id || index;
    if (imageErrors.has(imageId)) {
      return "/placeholder-product.jpg";
    }
    return item.product?.banner || "/placeholder-product.jpg";
  }, [imageErrors]);

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

  const getItemsPreview = (items) => {
    if (!items || items.length === 0) return "No items";

    const firstItem = items[0];
    const remainingCount = items.length - 1;

    const itemName = firstItem.product?.name || "Unknown Product";

    if (remainingCount > 0) {
      return `${itemName} +${remainingCount} more`;
    }
    return itemName;
  };

  const getTotalItems = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((total, item) => total + (item.unit || 1), 0);
  };

  const formatOrderId = (orderId) => {
    if (orderId && orderId.length > 8) {
      return `ORD-${orderId.substring(0, 8).toUpperCase()}`;
    }
    return orderId || "N/A";
  };

  const formatAddress = (address) => {
    if (!address) return null;
    
    const parts = [];
    if (address.street) parts.push(address.street);
    if (address.city) parts.push(address.city);
    if (address.postalCode) parts.push(address.postalCode);
    if (address.country) parts.push(address.country);
    
    return parts.join(", ");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group hover:scale-[1.02] transform">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 via-lime-500 to-emerald-500 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4 mb-3 md:mb-0">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shadow-sm">
              <FaShoppingBag className="text-white text-lg" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-1">
                {formatOrderId(order.orderId)}
              </h3>
              <div className="flex items-center text-white/80 text-sm">
                <FaClock className="mr-2" />
                {formatDate(order.createdAt)}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize ${getStatusColor(
                order.status
              )} shadow-sm`}
            >
              {order.status}
            </span>
            <button
              onClick={() => onViewOrder(order)}
              className="flex items-center space-x-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 shadow-sm"
            >
              <FaEye className="text-sm" />
              <span className="font-medium">View Details</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Address Section */}
        {order.address && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border border-blue-100">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                <FaMapMarkerAlt className="text-white text-sm" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-blue-800 mb-1">Delivery Address</p>
                <p className="text-sm text-blue-700 leading-relaxed">{formatAddress(order.address)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Items Info */}
          <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-lg p-4 border border-green-100">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-sm">
                <FaBox className="text-white text-sm" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800">Total Items</p>
                <p className="text-xl font-bold text-green-600">{getTotalItems(order.items)}</p>
              </div>
            </div>
            <p className="text-sm text-green-600 truncate">{getItemsPreview(order.items)}</p>
            <p className="text-xs text-green-500 mt-1">
              {order.items?.length === 1 ? "1 product type" : `${order.items?.length || 0} product types`}
            </p>
          </div>

          {/* Total Amount */}
          <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-lg p-4 border border-green-100">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-sm">
                <FaDollarSign className="text-white text-sm" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800">Order Total</p>
                <p className="text-xl font-bold text-green-600">
                  ${order.amount?.toFixed(2) || "0.00"}
                </p>
              </div>
            </div>
            <p className="text-xs text-green-500">Including all fees</p>
          </div>

          {/* Date Info */}
          <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-lg p-4 border border-green-100">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-sm">
                <FaCalendarAlt className="text-white text-sm" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800">Created</p>
                <p className="text-sm font-bold text-green-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-xs text-green-500">
              {new Date(order.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* Items Preview */}
        {order.items && order.items.length > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-lime-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-800">Order Items</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
                  {getTotalItems(order.items)} units
                </span>
              </div>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
              {order.items.slice(0, 6).map((item, index) => {
                const imageId = item._id || index;
                return (
                  <div key={imageId} className="flex-shrink-0 relative group">
                    <div className="relative overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200">
                      <img
                        src={getImageSrc(item, index)}
                        alt={item.product?.name || "Product"}
                        className="w-20 h-20 object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={() => handleImageError(imageId)}
                        loading="lazy"
                      />
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shadow-sm border-2 border-white">
                        {item.unit || 1}
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium text-gray-700 truncate max-w-20">
                        {item.product?.name || "Unknown"}
                      </p>
                      <p className="text-xs font-bold text-green-600">
                        ${item.product?.price || 0}
                      </p>
                    </div>
                  </div>
                );
              })}
              {order.items.length > 6 && (
                <div className="flex-shrink-0 w-20 h-20 bg-green-50 rounded-lg border-2 border-dashed border-green-200 flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <span className="text-sm font-bold text-gray-600">+{order.items.length - 6}</span>
                    <p className="text-xs text-gray-500">more</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gradient-to-r from-green-50 to-lime-50 rounded-lg p-4 border border-green-100">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FaClock className="text-gray-400" />
              <span>Updated: {formatDate(order.updatedAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-800">Total:</span>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ${order.amount?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;