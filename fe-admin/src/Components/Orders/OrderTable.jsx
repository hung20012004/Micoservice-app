import React, { useState, useCallback, useRef } from "react";
import OrderStatusForm from "./OrderStatusForm";
function OrderTable({ orders, onUpdateStatus, searchTerm }) {
  const [imageErrors, setImageErrors] = useState({});
  const imageLoadedRef = useRef(new Set());

  // Memoize image error handler
  const handleImageError = useCallback((itemId) => {
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  }, []);

  const handleImageLoad = useCallback((itemId) => {
    imageLoadedRef.current.add(itemId);
  }, []);

  // Order image component
  const OrderImage = ({ item }) => {
    const hasLoaded = imageLoadedRef.current.has(item._id);
    
    if (imageErrors[item._id] || !item.product.banner) {
      return (
        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
          <span className="text-gray-400 text-xs">No img</span>
        </div>
      );
    }

    return (
      <img
        className="w-10 h-10 rounded object-cover flex-shrink-0"
        src={item.product.banner}
        alt={item.product.name}
        onError={() => handleImageError(item._id)}
        onLoad={() => handleImageLoad(item._id)}
        loading={hasLoaded ? "eager" : "lazy"}
      />
    );
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="text-gray-400 text-4xl mb-4">📦</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
        <p className="text-gray-600 mb-4">
          {searchTerm ? "No orders match your search." : "No orders available."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {order.orderId}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {order.customerId}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">
                    ${order.amount.toFixed(2)}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    order.status === 'received' ? 'bg-green-100 text-green-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">
                    {order.address ? 
                      `${order.address.street}, ${order.address.city}, ${order.address.postalCode}, ${order.address.country}` : 
                      'No address'}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex items-center space-x-3">
                        <OrderImage item={item} />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {item.product.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            Quantity: {item.unit} | ${item.product.price.toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  <OrderStatusForm
                    order={order}
                    onUpdateStatus={onUpdateStatus}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;