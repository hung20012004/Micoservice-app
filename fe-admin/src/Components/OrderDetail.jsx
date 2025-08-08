import React, { useState, useCallback } from "react";
import { 
  FaTimes, FaCalendarAlt, FaMapMarkerAlt, 
  FaCreditCard, FaClipboardList,
  FaPrint, FaDownload, FaHome, FaCity, FaGlobeAmericas
} from "react-icons/fa";

function OrderDetail({ order, onClose, getStatusColor }) {
  const [imageErrors, setImageErrors] = useState(new Set());
  
  if (!order) {
    return null;
  }

  const handleImageError = useCallback((imageId) => {
    setImageErrors(prev => new Set(prev).add(imageId));
  }, []);

  const getImageSrc = useCallback((item, index) => {
    const imageId = item._id || index;
    if (imageErrors.has(imageId)) {
      return "/placeholder-product.jpg";
    }
    return item.product?.banner || item.product?.image || "/placeholder-product.jpg";
  }, [imageErrors]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEachItemTotal = (item) => {
    const quantity = item.unit || item.qty || 1;
    const price = item.product?.price || 0;
    return quantity * price;
  };

  const getTotalItems = () => {
    return order.items?.reduce((total, item) => total + (item.unit || item.qty || 1), 0) || 0;
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'card':
        return <FaCreditCard className="text-blue-500" />;
      case 'bank':
        return <FaCreditCard className="text-green-500" />;
      case 'cash':
        return <span className="text-yellow-500">💵</span>;
      default:
        return <FaCreditCard className="text-gray-500" />;
    }
  };

  const getPaymentMethodName = (method) => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card';
      case 'bank':
        return 'Bank Transfer';
      case 'cash':
        return 'Cash on Delivery';
      default:
        return 'Unknown';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Download feature would generate a PDF receipt here');
  };

  const formatFullAddress = (address) => {
    if (!address) return null;
    
    return {
      street: address.street || '',
      city: address.city || '',
      postalCode: address.postalCode || '',
      country: address.country || ''
    };
  };

  const formattedAddress = formatFullAddress(order.address);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaClipboardList className="text-green-600 text-lg" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                <p className="text-gray-500">{order.orderId}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrint}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Print Order"
              >
                <FaPrint />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Download Receipt"
              >
                <FaDownload />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Order Status and Date */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3 md:mb-0">
              <FaCalendarAlt className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-semibold text-gray-800">{formatDate(order.createdAt)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Status:</span>
              <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>

          {/* Detailed Address Information */}
          {formattedAddress && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                Delivery Address
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Street Address */}
                {formattedAddress.street && (
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaHome className="text-blue-600 text-sm" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Street Address</p>
                      <p className="text-gray-800 font-medium">{formattedAddress.street}</p>
                    </div>
                  </div>
                )}

                {/* City */}
                {formattedAddress.city && (
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaCity className="text-green-600 text-sm" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">City</p>
                      <p className="text-gray-800 font-medium">{formattedAddress.city}</p>
                    </div>
                  </div>
                )}

                {/* Postal Code */}
                {formattedAddress.postalCode && (
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-600 text-xs font-bold">ZIP</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Postal Code</p>
                      <p className="text-gray-800 font-medium">{formattedAddress.postalCode}</p>
                    </div>
                  </div>
                )}

                {/* Country */}
                {formattedAddress.country && (
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FaGlobeAmericas className="text-purple-600 text-sm" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Country</p>
                      <p className="text-gray-800 font-medium">{formattedAddress.country}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Full Address Display */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-medium text-blue-800 mb-2">Complete Address</h4>
                <p className="text-blue-700 text-sm leading-relaxed">
                  {[
                    formattedAddress.street,
                    formattedAddress.city,
                    formattedAddress.postalCode,
                    formattedAddress.country
                  ].filter(Boolean).join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Payment Information */}
          {order.paymentMethod && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaCreditCard className="mr-2 text-green-600" />
                Payment Information
              </h3>
              
              <div className="flex items-center space-x-3">
                {getPaymentMethodIcon(order.paymentMethod)}
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium text-gray-800">{getPaymentMethodName(order.paymentMethod)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Order Notes */}
          {order.notes && (
            <div className="mb-8 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 mb-1">Order Notes</h4>
              <p className="text-sm text-yellow-700">{order.notes}</p>
            </div>
          )}

          {/* Order Items */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Items ({getTotalItems()} items)</h3>
            
            <div className="space-y-4">
              {order.items?.map((item, index) => {
                const imageId = item._id || index;
                return (
                  <div key={imageId} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    {/* Product Image */}
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={getImageSrc(item, index)}
                        alt={item.product?.name || 'Product'}
                        className="w-full h-full object-cover rounded-lg"
                        onError={() => handleImageError(imageId)}
                        loading="lazy"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 truncate">
                        {item.product?.name || 'Unknown Product'}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.product?.desc || 'No description available'}
                      </p>
                      <div className="flex items-center mt-2 text-sm">
                        <span className="text-green-600 font-medium">
                          ${item.product?.price || 0}
                        </span>
                        <span className="text-gray-400 mx-2">×</span>
                        <span className="text-gray-600">
                          {item.unit || item.qty || 1}
                        </span>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="font-semibold text-lg text-gray-800">
                        ${getEachItemTotal(item).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Items ({getTotalItems()})</span>
                  <span className="font-medium">${(order.amount || order.total)?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${(order.amount || order.total)?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <FaPrint />
              <span>Print Receipt</span>
            </button>
            
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <FaDownload />
              <span>Download PDF</span>
            </button>
            
            {order.status === 'pending' && (
              <button className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;