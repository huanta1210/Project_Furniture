import { Product } from "./Product";

export interface CartItem {
  _id?: string;
  product: Product;
  items?: CartItem[];
  quantity: number;
  totalPrice?: number;
}

export interface OrderItem {
  _id?: string | number;
  product?: Product;
  quantity: number;
  price: number;
  orderId: string | number;
  productId: string | number;
}
export interface Order {
  _id?: string;
  orderDate: string;
  total: number;
  paymentStatus: string;
  userId: string;
  addressId: string | unknown;
  orderItems?: string[] | number;
}

export type State = {
  cartItems: CartItem[];
  orders: Order[];
  orderitems: OrderItem[];
};

export type Action =
  | { type: "SET_ORDER_ITEM"; payload: OrderItem }
  | { type: "SET_CART"; payload: CartItem }
  | { type: "SET_ORDER"; payload: Order[] }
  | { type: "ADD_CART"; payload: { items: CartItem[] } }
  | { type: "INCREASE_QUANTITY"; payload: string | number }
  | { type: "DESCREASE_QUANTITY"; payload: string | number }
  | { type: "DELETE_CART"; payload: string | number }
  | { type: "DELETE_ALL_CART" }
  | { type: "PLACE_ORDER"; payload: Order }
  | {
      type: "UPDATE_CART_ITEM";
      payload: { productId: string | number; quantity: number };
    }
  | {
      type: "UPDATE_ORDER_STATUS";
      payload: {
        orderId: string;
        paymentStatus: string;
      };
    }
  | {
      type: "DESCREASE_QUANTITY_UPDATE";
      payload: { productId: string | number; quantity: number };
    };
