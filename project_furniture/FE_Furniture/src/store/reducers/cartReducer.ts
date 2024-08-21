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
          updatedItems[existingItemIndex].quantity += item.quantity;
          updatedItems[existingItemIndex].totalPrice =
            updatedItems[existingItemIndex].product.price! *
            updatedItems[existingItemIndex].quantity;
        } else {
          updatedItems.push({
            ...item,
            quantity: item.quantity,
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
    case "UPDATE_ORDER_STATUS": {
      const { orderId, paymentStatus } = action.payload;
      return {
        ...cartState,
        orders: cartState.orders.map((order) =>
          order._id === orderId
            ? { ...order, paymentStatus: paymentStatus }
            : order
        ),
      };
    }
    case "PLACE_ORDER": {
      return {
        ...cartState,
        orders: [...cartState.orders, action.payload],
      };
    }
    case "DESCREASE_QUANTITY_UPDATE": {
      const updateCartItemStock = cartState.cartItems.map((item) =>
        item.product._id === action.payload.productId
          ? {
              ...item,
              product: {
                ...item.product,
                stock: item.product.stock! - action.payload.quantity,
              },
            }
          : item
      );
      return {
        ...cartState,
        cartItems: updateCartItemStock,
      };
    }
    case "SET_ORDER": {
      return {
        ...cartState,
        orders: action.payload,
      };
    }
    case "SET_ORDER_ITEM": {
      return {
        ...cartState,
        orderitems: [...cartState.orderitems, action.payload],
      };
    }

    default:
      return cartState;
  }
};

export default cartReducer;
