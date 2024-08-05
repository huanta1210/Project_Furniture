import { Action, State } from "../../interfaces/Cart";

const cartReducer = (cartState: State, action: Action) => {
  switch (action.type) {
    case "ADD_CART": {
      const { product, quantity } = action.payload;
      if (!product || !product._id) {
        throw new Error("Product or product ID is missing");
      }

      const existingItem = cartState.cartItems.find(
        (item) => item.product && item.product._id === product._id
      );
      if (existingItem) {
        return {
          ...cartState,
          cartItems: cartState.cartItems.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return {
          ...cartState,
          cartItems: [...cartState.cartItems, { product, quantity }],
        };
      }
    }
    case "INCREASE_QUANTITY": {
      return {
        ...cartState,
        cartItems: cartState.cartItems.map((item) =>
          item.product._id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case "DESCREASE_QUANTITY": {
      return {
        ...cartState,
        cartItems: cartState.cartItems.map((item) =>
          item.product._id === action.payload
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        ),
      };
    }
    case "DELETE_CART": {
      return {
        ...cartState,
        cartItems: cartState.cartItems.filter(
          (item) => item.product._id !== action.payload
        ),
      };
    }

    default:
      return cartState;
  }
};

export default cartReducer;
