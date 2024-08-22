import { State, Action } from "../../interfaces/Order";

const orderReducer = (orderState: State, action: Action) => {
  switch (action.type) {
    case "SET_ORDER_CHART": {
      return {
        ...orderState,
        orderCharts: action.payload,
      };
    }
    default:
      return orderState;
  }
};

export default orderReducer;
