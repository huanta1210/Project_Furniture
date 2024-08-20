import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { CartItem, Order, OrderItem } from "../../interfaces/Cart";
import { ChildrenProps } from "../../interfaces/Children";
import cartReducer from "../reducers/cartReducer";
import { toast } from "react-toastify";
import instance from "../../api";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router";

type CartContext = {
  cartState: {
    cartItems: CartItem[];
    orders: Order[];
    orderitems: OrderItem[];
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
  placeOrder: (order: Order) => void;
};

export const CartContext = createContext<CartContext>({} as CartContext);

export const CartProvider = ({ children }: ChildrenProps) => {
  const navigate = useNavigate();
  const [cartState, dispatch] = useReducer(cartReducer, {
    cartItems: [],
    orders: [],
    orderitems: [],
  });
  const { userState } = useContext(AuthContext);
  // const { orderItem } = useContext(CartContext);

  const userId: string | number = userState.users?._id || "";

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
  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(`/cart/${userId}`);
        if (!res) {
          toast.error("Get cart failed", { autoClose: 300 });
        }
        dispatch({ type: "SET_CART", payload: res.data.datas });
      } catch (error) {
        console.log(error);
        toast.error("Get cart failed");
      }
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
          userId: userState.users?._id,
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
    [userState.users?._id]
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
        toast.error("Data delete failed");
      } else {
        dispatch({ type: "DELETE_ALL_CART" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting all cart");
    }
  };
  const placeOrder = useCallback(
    async (order: Order) => {
      try {
        const res = await instance.post("/order/create-order", order);
        if (!res || !res.data || !res.data.datas) {
          toast.error("Error creating order");
          return;
        }

        const newOrder = res.data.datas;
        const orderId = newOrder._id;

        cartState.cartItems.map((item) =>
          orderItem({
            quantity: item.quantity,
            price: item.totalPrice!,
            productId: item.product._id,
            orderId: orderId!,
          })
        );
        dispatch({ type: "PLACE_ORDER", payload: newOrder });

        toast.success("Order created", {
          autoClose: 500,
        });

        setTimeout(() => {
          navigate("/products");
        }, 500);
      } catch (error) {
        console.log(error);
        toast.error("Error post order");
      }
    },
    [navigate]
  );

  const orderItem = useCallback(async (data: OrderItem) => {
    try {
      const res = await instance.post("/order-items/create-orderItems", data);

      if (!res) {
        toast.error("Error creating orderItem", { autoClose: 200 });
      }
      dispatch({ type: "SET_ORDER_ITEM", payload: res.data.datas });
    } catch (error) {
      console.log(error);
      toast.error("Error post orderItem", {
        autoClose: 200,
      });
    }
  }, []);

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
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
