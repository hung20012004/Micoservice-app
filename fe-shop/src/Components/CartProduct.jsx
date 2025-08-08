import React from "react";
import { AiFillDelete } from "../Collection/ReactIconsCollection";
import { CartState } from "../Context/CartContext";

function CartProduct({ fruit, getEachFruitTotalPrice }) {
  const { addToCartAPI, removeFromCartAPI } = CartState();

  // Handle case where fruit might not exist
  if (!fruit) {
    console.error('CartProduct: fruit is undefined', fruit);
    return <div>Error: Product data is missing</div>;
  }

  // Handle case where product might not exist
  if (!fruit.product) {
    console.error('CartProduct: fruit.product is undefined', fruit);
    return <div>Error: Product data is missing</div>;
  }

  const { product } = fruit;
  const currentQuantity = fruit.unit || fruit.qty || 1;

  // Handle increase quantity
  const handleIncrease = async () => {
    const newQuantity = currentQuantity + 1;
    await addToCartAPI(fruit, newQuantity);
  };

  // Handle decrease quantity
  const handleDecrease = async () => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      await addToCartAPI(fruit, newQuantity);
    }
  };

  // Handle remove from cart using DELETE endpoint
  const handleRemoveFromCart = async () => {
    await removeFromCartAPI(product._id);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <div className="w-20 h-20 xl:w-24 xl:h-24 flex-shrink-0">
          <img 
            src={product.banner || product.image || ''} 
            alt={product.name || 'Product'}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-lg truncate">
            {product.name ? product.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
              letter.toUpperCase()
            ) : 'Unknown Product'}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {product.desc || 'No description available'}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-green-600 font-semibold">
              ${product.price || 0}
            </span>
            <span className="text-gray-500 text-sm ml-2">per item</span>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col items-center space-y-2">
          <label className="text-sm text-gray-600">Quantity</label>
          
          {/* Plus/Minus Controls Only */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDecrease}
              disabled={currentQuantity <= 1}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center text-gray-700 font-semibold transition-colors text-lg"
            >
              -
            </button>
            
            <span className="min-w-[3rem] text-center font-semibold text-xl bg-white px-3 py-2 rounded-md border">
              {currentQuantity}
            </span>
            
            <button
              onClick={handleIncrease}
              disabled={currentQuantity >= 10}
              className="w-10 h-10 rounded-full bg-green-200 hover:bg-green-300 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center text-green-700 font-semibold transition-colors text-lg"
            >
              +
            </button>
          </div>
        </div>

        {/* Price and Delete */}
        <div className="flex flex-col items-end space-y-2">
          <div className="text-right">
            <div className="text-xl font-bold text-gray-800">
              ${getEachFruitTotalPrice(fruit)}
            </div>
            <div className="text-sm text-gray-500">
              Total
            </div>
          </div>
          <button
            onClick={handleRemoveFromCart}
            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
            title="Remove from cart"
          >
            <AiFillDelete fontSize="20px" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;