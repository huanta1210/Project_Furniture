export interface OrderChart {
  _id?: string;
  orderDate: string;
  total: number;
  paymentStatus: string;
  userId: string;
  addressId: string | unknown;
  orderItems: string[];
}

export type State = {
  orderCharts: OrderChart[];
};

export type Action = { type: "SET_ORDER_CHART"; payload: OrderChart[] };
