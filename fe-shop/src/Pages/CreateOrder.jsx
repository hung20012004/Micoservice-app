import React, { useState } from "react";
import { CartState } from "../Context/CartContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserProfile from "../Components/UserProfile";
import AddressManager from "../Components/AddressManager";

function CreateOrder() {
  const {
    state: { cart },
    dispatch // Add dispatch to clear cart
  } = CartState();

  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null); // New state for selected address object
  const [loading, setLoading] = useState(false);

  // Flatten cart items
  const cartItems = cart.flatMap(cartEntry => 
    cartEntry.items.map(item => ({
      ...item,
      cartId: cartEntry._id,
      customerId: cartEntry.customerId
    }))
  );

  const getEachFruitTotalPrice = (item) => {
    const sum = (item.unit || item.qty || 1) * (item.product?.price || 0);
    return sum;
  };

  const getTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += getEachFruitTotalPrice(item);
    });
    return total;
  };

  const handleProfileLoad = (profileData) => {
    setUserProfile(profileData);
  };

  // Updated to handle both addressId and address object
  const handleAddressSelect = (addressId, addressObject) => {
    setSelectedAddressId(addressId);
    setSelectedAddress(addressObject);
  };

  // Function to clear cart after successful order
  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART" // You might need to add this action type to your CartContext
    });
  };

  // Function to reset form state
  const resetFormState = () => {
    setUserProfile(null);
    setSelectedAddressId(null);
    setSelectedAddress(null);
    setLoading(false);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!userProfile) {
      alert("Please wait for profile to load");
      return;
    }

    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    setLoading(true);

    try {
      // Generate transaction number
      const txnNumber = `TXN-${Date.now()}`;
      
      // Prepare address object for API
      const addressObject = {
        street: selectedAddress.street,
        city: selectedAddress.city,
        postalCode: selectedAddress.postalCode,
        country: selectedAddress.country
      };
      
      // Updated order data structure
      const orderData = {
        txnNumber,
        address: addressObject, // Send address object instead of deliveryAddressId
        customerInfo: userProfile,
        items: cartItems,
        total: getTotal(),
        status: "Created"
      };
      
      // Call your actual API
      const response = await fetch('http://localhost:80/shopping/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const result = await response.json();
      
      console.log("Order created:", result);
      
      // Clear cart after successful order
      clearCart();
      
      // Reset form state
      resetFormState();
      
      // Show success message
      alert("Đặt hàng thành công!");
      
      // Navigate to orders page
      navigate("/orders", { replace: true }); // Use replace to prevent going back to this page
      
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Có lỗi xảy ra khi tạo đơn hàng: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="text-gray-400 text-8xl mb-6">🛒</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No Items to Order</h2>
              <p className="text-gray-600 mb-6">
                Please add items to your cart first
              </p>
              <button
                onClick={() => navigate("/fruits")}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
              >
                <FaArrowLeft />
                <span>Go Shopping</span>
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
            Create <span className="text-green-600">Order</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Review your information and complete your order
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="flex flex-col xl:flex-row gap-8">
          {/* Order Form */}
          <div className="xl:w-2/3">
            {/* User Profile Component */}
            <UserProfile 
              onProfileLoad={handleProfileLoad}
              editable={true}
            />

            {/* Address Manager Component - Updated props */}
            <AddressManager 
              onAddressChange={(addressId, addressObject) => handleAddressSelect(addressId, addressObject)}
              selectedAddressId={selectedAddressId}
              onSelectAddress={handleAddressSelect}
            />

            {/* Back Button */}
            <div className="flex justify-start mt-6">
              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                <FaArrowLeft />
                <span>Back to Cart</span>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="xl:w-1/3">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                {/* Selected Address Display */}
                {selectedAddress && (
                  <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="text-sm font-medium text-green-800 mb-1">Delivery Address:</h3>
                    <p className="text-sm text-green-700">
                      {selectedAddress.street}
                    </p>
                    <p className="text-sm text-green-700">
                      {selectedAddress.city}{selectedAddress.postalCode && `, ${selectedAddress.postalCode}`}
                    </p>
                    {selectedAddress.country && (
                      <p className="text-sm text-green-700">{selectedAddress.country}</p>
                    )}
                  </div>
                )}
                
                {/* Order Items */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.product?.banner || item.product?.image || ''}
                        alt={item.product?.name || 'Product'}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {item.product?.name || 'Unknown Product'}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.unit || item.qty || 1} × ${item.product?.price || 0}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-green-600">
                        ${getEachFruitTotalPrice(item)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-4 mb-6 border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Items ({cartItems.length})</span>
                    <span className="font-semibold">${getTotal()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-green-600">${getTotal()}</span>
                    </div>
                  </div>
                </div>

                {/* Order Status Info */}
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <span className="font-medium">Status:</span> Created
                  </p>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={loading || !userProfile || !selectedAddress}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Order...
                    </>
                  ) : !userProfile ? (
                    "Loading Profile..."
                  ) : !selectedAddress ? (
                    "Select Address..."
                  ) : (
                    "Place Order"
                  )}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    🔒 Your information is secure and protected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateOrder;