import { State, Action } from "../../interfaces/Categories";

const categoriesReducer = (category: State, action: Action) => {
  switch (action.type) {
    case "SET_CATEGORIES": {
      return {
        ...category,
        categories: action.payload,
      };
    }
    case "CREATE_CATEGORIES": {
      return {
        ...category,
        categories: [...category.categories, action.payload],
      };
    }
    case "UPDATE_CATEGORIES": {
      return {
        ...category,
        categories: category.categories.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    }
    case "DELETE_CATEGORIES": {
      return {
        ...category,
        categories: category.categories.filter(
          (item) => item._id !== action.payload
        ),
      };
    }
    case "GET_DETAIL_CATEGORY": {
      return {
        ...category,
        selectedCategory: action.payload,
      };
    }
    case "FILTER_CATEGORIES": {
      return {
        ...category,
        products: category.products.filter(
          (item) => item.categoriesId === action.payload
        ),
      };
    }

    default:
      return category;
  }
};
export default categoriesReducer;
