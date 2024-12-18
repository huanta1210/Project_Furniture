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
import { OrderContext } from "./OrderContext";

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
  updateOrderStatus: (orderId: string, paymentStatus: string) => void;
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

  const userId: string | number = userState.users?._id || "";

  const { getOrderList } = useContext(OrderContext);

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
    if (userId && cartState.cartItems.length > 0) {
      (async () => {
        try {
          const res = await instance.get(`/cart/${userId}`);
          dispatch({ type: "SET_CART", payload: res.data.datas });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [userId]);
  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(`/order/get-order/${userId}`);
        if (!res) {
          toast.error("Get order failed", { autoClose: 300 });
        }
        dispatch({ type: "SET_ORDER", payload: res.data.datas });
      } catch (error) {
        console.log(error);
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
    async (data: CartItem) => {
      try {
        if (!userState.token) {
          toast.error("You must be logged in");
        }
        const newCart = {
          userId: userState.users?._id,
          product: data.product,
          quantity: data.quantity,
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
      }
    },
    [userState.users?._id, userState.token]
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
        console.log("Data delete failed");
      } else {
        dispatch({ type: "DELETE_ALL_CART" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting all cart");
    }
  };
  const placeOrder = async (order: Order) => {
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
  };

  const orderItem = async (data: OrderItem) => {
    console.log(data);
    try {
      const res = await instance.post("/order-items/create-orderItems", data);
      console.log(res.data.datas);
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
  };

  const updateOrderStatus = async (orderId: string, paymentStatus: string) => {
    try {
      const res = await instance.put(`/order/update-order/${orderId}`, {
        paymentStatus: paymentStatus,
      });

      if (res.status === 200) {
        dispatch({
          type: "UPDATE_ORDER_STATUS",
          payload: {
            orderId,
            paymentStatus,
          },
        });
        getOrderList();
      }
    } catch (error) {
      console.log(error);
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
        placeOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
