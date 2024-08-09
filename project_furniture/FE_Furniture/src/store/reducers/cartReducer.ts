import { Action, State } from "../../interfaces/Cart";

const cartReducer = (cartState: State, action: Action): State => {
  switch (action.type) {
    case "SET_CART": {
      const items = action.payload.items || [];
      return {
        ...cartState,
        cartItems: items,
      };
    }
    case "ADD_CART": {
      const { items } = action.payload;

      const updatedItems = [...cartState.cartItems];

      items.forEach((item) => {
        const existingItemIndex = updatedItems.findIndex(
          (existing) => existing.product._id === item.product._id
        );

        if (existingItemIndex !== -1) {
          updatedItems[existingItemIndex].quantity += 1;
          updatedItems[existingItemIndex].totalPrice =
            updatedItems[existingItemIndex].product.price! *
            updatedItems[existingItemIndex].quantity;
        } else {
          updatedItems.push({
            ...item,
            quantity: 1,
            totalPrice: item.product.price! * item.quantity,
          });
        }
      });

      return {
        ...cartState,
        cartItems: updatedItems,
      };
    }
    case "INCREASE_QUANTITY": {
      return {
        ...cartState,
        cartItems: cartState.cartItems.map((item) =>
          item.product._id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.product.price! * (item.quantity + 1),
              }
            : item
        ),
      };
    }
    case "DESCREASE_QUANTITY": {
      return {
        ...cartState,
        cartItems: cartState.cartItems.map((item) =>
          item.product._id === action.payload
            ? {
                ...item,
                quantity: Math.max(item.quantity - 1, 1),
                totalPrice:
                  item.product.price! * Math.max(item.quantity - 1, 1),
              }
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
    case "DELETE_ALL_CART": {
      return {
        ...cartState,
        cartItems: [],
      };
    }
    case "UPDATE_CART_ITEM": {
      const { productId, quantity } = action.payload;

      const updatedItems = cartState.cartItems.map((item) =>
        item.product._id === productId
          ? { ...item, quantity, totalPrice: item.totalPrice! * quantity }
          : item
      );
      return {
        ...cartState,
        cartItems: updatedItems,
      };
    }

    default:
      return cartState;
  }
};

export default cartReducer;
