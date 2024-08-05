import { Action, State } from "../../interfaces/Product";

const productReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_PRODUCTS": {
      return {
        ...state,
        products: action.payload,
      };
    }

    case "CREATE_PRODUCTS": {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    }
    case "UPDATE_PRODUCTS": {
      return {
        ...state,
        products: state.products.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    }
    case "DELETE_PRODUCTS": {
      return {
        ...state,
        products: state.products.filter((item) => item._id !== action.payload),
      };
    }
    case "GET_DETAIL_PRODUCT": {
      return {
        ...state,
        selectedProduct: action.payload,
      };
    }

    default:
      return state;
  }
};

export default productReducer;
