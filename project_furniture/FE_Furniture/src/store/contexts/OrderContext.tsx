import { createContext, useEffect, useReducer } from "react";
import { OrderChart } from "../../interfaces/Order";
import { ChildrenProps } from "../../interfaces/Children";
import orderReducer from "../reducers/orderReducer";
import instance from "../../api";
import { toast } from "react-toastify";

type OrderContext = {
  orderState: {
    orderCharts: OrderChart[];
  };
  getOrderList: () => void;
};
export const OrderContext = createContext<OrderContext>({} as OrderContext);

export const OrderProvider = ({ children }: ChildrenProps) => {
  const [orderState, dispatch] = useReducer(orderReducer, { orderCharts: [] });
  useEffect(() => {
    getOrderList();
  }, []);

  const getOrderList = async () => {
    try {
      const res = await instance.get("/order");

      if (!res) {
        toast.error("Order not found");
      } else {
        dispatch({ type: "SET_ORDER_CHART", payload: res.data.datas });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <OrderContext.Provider value={{ orderState, getOrderList }}>
      {children}
    </OrderContext.Provider>
  );
};
