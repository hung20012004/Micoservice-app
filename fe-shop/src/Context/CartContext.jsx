import { createContext, useContext, useReducer, useEffect } from "react";
import { CartReducer, fruitReducer } from "./CartReducer";

const Cart = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, {
    cart: [],
  });

  const [fruitState, fruitDispatch] = useReducer(fruitReducer, {
    byType: false,
    byPrice: false,
    byAvailability: false,
    sort: null,
  });

  // Function to get token
  const getToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  // Fetch cart data from server
  const fetchCartAPI = async () => {
    try {
      const token = getToken();
      
      if (!token) {
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await fetch('http://localhost:80/shopping/cart', {
        method: 'GET',
        headers: headers,
      });

      const responseText = await response.text();
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = responseText;
      }

      if (response.ok) {
        dispatch({ type: "LOAD_CART", payload: responseData });
      } else {
        console.error(`Error ${response.status}: ${responseData.message || responseData}`);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  // Add to cart - unified function for updating cart quantities
  const addToCartAPI = async (item, quantity = 1) => {
    try {
      const token = getToken();
      
      if (!token) {
        alert('Please login first');
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const productId = item.product ? item.product._id : item._id;

      const body = {
        _id: productId,
        qty: quantity,
      };

      console.log('Sending to server:', body);

      const response = await fetch('http://localhost:80/cart', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
      });

      const responseText = await response.text();
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = responseText;
      }

      if (response.ok) {
        if (quantity === 0) {
          dispatch({ type: "REMOVE_FROM_CART", payload: { _id: productId } });
          alert('Removed from cart successfully!');
        } else {
          dispatch({ 
            type: "UPDATE_CART_ITEM", 
            payload: { 
              product: item.product || item, 
              quantity: quantity,
            } 
          });
        }
        
        await fetchCartAPI();
      } else {
        alert(`Error ${response.status}: ${responseData.message || responseData}`);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('Network error. Please try again.');
    }
  };

  // Remove from cart - using DELETE endpoint with productId
  const removeFromCartAPI = async (productId) => {
    try {
      const token = getToken();
      
      if (!token) {
        alert('Please login first');
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await fetch(`http://localhost:80/cart/${productId}`, {
        method: 'DELETE',
        headers: headers,
      });

      const responseText = await response.text();
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = responseText;
      }

      if (response.ok) {
        dispatch({ 
          type: "REMOVE_FROM_CART", 
          payload: { _id: productId },
        });
        alert('Removed from cart successfully!');
        await fetchCartAPI(); // Refresh cart data
      } else {
        alert(`Error ${response.status}: ${responseData.message || responseData}`);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Network error. Please try again.');
    }
  };

  // Load cart data when component mounts and token exists
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchCartAPI();
    }
  }, []);

  return (
    <Cart.Provider value={{ 
      state, 
      dispatch, 
      fruitState, 
      fruitDispatch,
      addToCartAPI,
      removeFromCartAPI,
      fetchCartAPI,
    }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};