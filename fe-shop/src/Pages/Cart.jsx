import React from "react";
import CartProduct from "../Components/CartProduct";
import { CartState } from "../Context/CartContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const navigate = useNavigate();

  // Flatten cart items to get all products
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

  const previousPage = () => {
    navigate("/fruits");
  };

  // Function to handle checkout navigation
  const handleCheckout = () => {
    navigate("/create-order");
  };

  return !cartItems.length ? (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="text-gray-400 text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet
            </p>
            <button
              onClick={previousPage}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
            >
              <FaArrowLeft />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4">
            Shopping <span className="text-green-600">Cart</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Review your selected items and proceed to checkout
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-green-600 font-semibold">{cartItems.length}</span>
              <span className="text-gray-600">Items in Cart</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-green-600 font-semibold">${getTotal()}</span>
              <span className="text-gray-600">Total</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Cart Items */}
          <div className="xl:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Items</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartProduct
                    key={item._id}
                    fruit={item}
                    getEachFruitTotalPrice={getEachFruitTotalPrice}
                    dispatch={dispatch}
                  />
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="flex justify-start">
              <button
                onClick={previousPage}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                <FaArrowLeft />
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="xl:w-1/4">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
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

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    🔒 Secure checkout guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;