import { Product } from "./Product";

export interface CartItem {
  product: Product;
  items?: CartItem[];
  quantity: number;
  totalPrice?: number;
}

export interface Order {
  _id: string | number;
  orderDate: string;
  total: number;
  paymentStatus: [
    "Pending",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Payment Completed"
  ];
  userId: string;
  orderItems: [];
}

export type State = {
  cartItems: CartItem[];
  orders: Order[];
};

export type Action =
  | { type: "SET_CART"; payload: CartItem }
  | { type: "ADD_CART"; payload: { items: CartItem[] } }
  | { type: "INCREASE_QUANTITY"; payload: string | number }
  | { type: "DESCREASE_QUANTITY"; payload: string | number }
  | { type: "DELETE_CART"; payload: string | number }
  | { type: "DELETE_ALL_CART" }
  | { type: "PLACE_ORDER"; payload: string }
  | {
      type: "UPDATE_CART_ITEM";
      payload: { productId: string | number; quantity: number };
    }
  | {
      type: "UPDATE_ORDER_STATUS";
      payload: {
        orderId: string | number;
        paymentStatus:
          | "Pending"
          | "Shipped"
          | "Delivered"
          | "Cancelled"
          | "Payment Completed";
      };
    };
