import React from "react";

function OrderStatusForm({ order, onUpdateStatus }) {
  return (
    <div className="flex space-x-3">
      <select
        value={order.status}
        onChange={(e) => onUpdateStatus(order._id, e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
      >
        <option value="created">Created</option>
        <option value="received">Received</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  );
}

export default OrderStatusForm;