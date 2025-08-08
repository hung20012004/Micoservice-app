export const CartReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART":
      return {
        ...state,
        cart: Array.isArray(action.payload) ? action.payload : [action.payload], // Ensure cart is an array
      };
    case "ADD_TO_CART":
      // Assuming cart is an array with one cart object per customer
      const existingCart = state.cart.length > 0 ? state.cart[0] : { _id: null, customerId: null, items: [] };
      const existingItem = existingCart.items.find(item => item.product._id === action.payload._id);
      
      if (existingItem) {
        // If item exists, update its quantity
        return {
          ...state,
          cart: [{
            ...existingCart,
            items: existingCart.items.map(item =>
              item.product._id === action.payload._id
                ? { ...item, unit: item.unit + 1 }
                : item
            ),
          }],
        };
      } else {
        // Add new item to the items array
        return {
          ...state,
          cart: [{
            ...existingCart,
            items: [...existingCart.items, { product: action.payload, unit: 1, _id: action.payload._id }],
          }],
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.map(cartEntry => ({
          ...cartEntry,
          items: cartEntry.items.filter(item => item._id !== action.payload._id),
        })),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.map(cartEntry => ({
          ...cartEntry,
          items: cartEntry.items.map(item =>
            item._id === action.payload._id
              ? { ...item, unit: action.payload.qty }
              : item
          ),
        })),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export const fruitReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "SORT_BY_RATING":
      return { ...state, byRating: action.payload };
    case "VITAMIN_C":
      return { ...state, byVitaminC: !state.byVitaminC };
    case "VITAMIN_B6":
      return { ...state, byVitaminB6: !state.byVitaminB6 };
    case "POTASSIUM":
      return { ...state, byPotassium: !state.byPotassium };
    case "CLEAR_FILTERS":
      return {
        byVitaminC: false,
        byVitaminB6: false,
        byPotassium: false,
        byRating: 0,
      };
    default:
      return state;
  }
};