import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { CartItem, Order } from "../../interfaces/Cart";
import { ChildrenProps } from "../../interfaces/Children";
import cartReducer from "../reducers/cartReducer";
import { toast } from "react-toastify";
import instance from "../../api";
import { AuthContext } from "./AuthContext";

type CartContext = {
  cartState: {
    cartItems: CartItem[];
    orders: Order[];
  };
  quantityCart: number;
  totalPrice: number;
  decreaseQuantity: (id: string | number) => void;
  increaseQuantity: (id: string | number) => void;
  addToCart: (data: CartItem) => void;
  handleDeleteCart: (
    userId: string | number,
    productId: string | number
  ) => void;
  updateCart: (productId: string | number, quantity: number) => void;
  handleDeleteAllCart: (userId: string | number) => void;
};

export const CartContext = createContext<CartContext>({} as CartContext);

export const CartProvider = ({ children }: ChildrenProps) => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    cartItems: [],
    orders: [],
  });
  const { userState } = useContext(AuthContext);
  const userId: string | number = userState.users?.id || "";

  const quantityCart = cartState.cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );
  console.log(cartState.cartItems);

  const totalPrice = cartState.cartItems.reduce((acc, item) => {
    if (item.product && item.product.price) {
      return acc + item.product.price * item.quantity;
    }
    return acc;
  }, 0);
  useEffect(() => {
    (async () => {
      const res = await instance.get(`/cart/${userId}`);
      if (!res) {
        toast.error("Get cart failed");
      }
      dispatch({ type: "SET_CART", payload: res.data.datas });
    })();
  }, [userId]);

  const decreaseQuantity = useCallback((id: string | number) => {
    dispatch({ type: "DESCREASE_QUANTITY", payload: id });
  }, []);

  const increaseQuantity = useCallback((id: string | number) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  }, []);

  const addToCart = useCallback(
    async (data: CartItem, quantity = 1) => {
      try {
        const newCart = {
          userId: userState.users?.id,
          product: data.product,
          quantity,
        };

        const cart = await instance.post("/cart/create-cart", newCart);
        const cartItem = cart.data.datas;

        if (!cartItem) {
          throw new Error("Invalid cart item data");
        }
        toast.success("Add product successfully", {
          autoClose: 300,
        });
        dispatch({
          type: "ADD_CART",
          payload: cartItem,
        });
        dispatch({ type: "SET_CART", payload: cartItem });
      } catch (error) {
        console.log(error);
        toast.error("Error adding");
      }
    },
    [userState.users?.id]
  );
  const handleDeleteCart = async (
    userId: string | number,
    productId: string | number
  ) => {
    try {
      const res = await instance.delete(
        `/cart/delete-cart/${userId}/${productId}`
      );

      if (!res) {
        toast.error("Error deleting");
      } else {
        toast.success("Delete cart sucsesfully", {
          autoClose: 300,
        });
        dispatch({ type: "DELETE_CART", payload: productId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting");
    }
  };
  const updateCart = async (productId: string | number, quantity: number) => {
    try {
      const res = await instance.put(
        `/update-cart/${userId}/item/${productId}`
      );
      if (!res) {
        toast.error("Data update failed");
      } else {
        dispatch({
          type: "UPDATE_CART_ITEM",
          payload: { productId, quantity },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating");
    }
  };
  const handleDeleteAllCart = async (userId: string | number) => {
    try {
      const res = await instance.delete(`/cart/delete-all-cart/${userId}`);

      if (!res) {
        toast.error("Error deleting all cart");
      }

      dispatch({ type: "DELETE_ALL_CART" });
    } catch (error) {
      console.log(error);
      toast.error("Error deleting all cart");
    }
  };
  return (
    <CartContext.Provider
      value={{
        handleDeleteAllCart,
        updateCart,
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
