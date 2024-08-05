import { createContext, useReducer } from "react";
import { CartItem } from "../../interfaces/Cart";
import { ChildrenProps } from "../../interfaces/Children";
import cartReducer from "../reducers/cartReducer";
import { toast } from "react-toastify";

type CartContext = {
  cartState: {
    cartItems: CartItem[];
  };
  quantityCart: number;
  totalPrice: number;
  decreaseQuantity: (id: string | number) => void;
  increaseQuantity: (id: string | number) => void;
  addToCart: (data: CartItem) => void;
  handleDeleteCart: (id: string | number) => void;
};

export const CartContext = createContext<CartContext>({} as CartContext);

export const CartProvider = ({ children }: ChildrenProps) => {
  const [cartState, dispatch] = useReducer(cartReducer, { cartItems: [] });

  const quantityCart = cartState.cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );
  const totalPrice = cartState.cartItems.reduce((acc, item) => {
    if (item.product && item.product.price) {
      return acc + item.product.price * item.quantity;
    }
    return acc;
  }, 0);
  const decreaseQuantity = (id: string | number) => {
    dispatch({ type: "DESCREASE_QUANTITY", payload: id });
  };

  const increaseQuantity = (id: string | number) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };

  const addToCart = (data: CartItem, quantity = 1) => {
    toast.success("Thêm sản phẩm thành công", {
      autoClose: 200,
    });
    if (data) {
      dispatch({ type: "ADD_CART", payload: data, quantity: quantity });
    }
  };
  const handleDeleteCart = (id: string | number) => {
    toast.success("Xoá sản phẩm thành công", {
      autoClose: 300,
    });
    dispatch({ type: "DELETE_CART", payload: id });
  };
  return (
    <CartContext.Provider
      value={{
        cartState,
        quantityCart,
        totalPrice,
        increaseQuantity,
        decreaseQuantity,
        addToCart,
        handleDeleteCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
