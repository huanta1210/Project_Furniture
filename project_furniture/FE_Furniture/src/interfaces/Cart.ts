import { Product } from "./Product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export type State = {
  cartItems: CartItem[];
};

export type Action =
  | { type: "ADD_CART"; payload: CartItem; quantity: number }
  | { type: "INCREASE_QUANTITY"; payload: string | number }
  | { type: "DESCREASE_QUANTITY"; payload: string | number }
  | { type: "DELETE_CART"; payload: string | number }
  | { type: "PLACE_ORDER"; payload: string }
  | {
      type: "UPDATE_ORDER_STATUS";
      payload: {
        orderId: string | number;
        status:
          | "Pending"
          | "Shipped"
          | "Delivered"
          | "Cancelled"
          | "Payment Completed";
      };
    };
