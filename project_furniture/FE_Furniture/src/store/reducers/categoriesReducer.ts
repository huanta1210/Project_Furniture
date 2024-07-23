import { State, Action } from "../../interfaces/Categories";

const categoriesReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_CATEGORIES": {
      return {
        ...state,
        categories: [
          action.payload.find((category) => category._id === "All") || {
            _id: "All",
            categoryName: "All",
            slug: "All",
          },
          ...action.payload,
        ],
      };
    }
    case "CREATE_CATEGORIES": {
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    }
    case "UPDATE_CATEGORIES": {
      return {
        ...state,
        categories: state.categories.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    }
    case "DELETE_CATEGORIES": {
      return {
        ...state,
        categories: state.categories.filter(
          (item) => item._id !== action.payload
        ),
      };
    }
    default:
      return state;
  }
};
export default categoriesReducer;
