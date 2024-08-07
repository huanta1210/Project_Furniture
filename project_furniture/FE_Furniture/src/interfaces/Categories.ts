import { Product } from "./Product";

export interface Categories {
  _id: string | number;
  categoryName: string;
  slug: string;
}

export type State = {
  categories: Categories[];
  selectedCategory?: Categories | null;
  products: Product[];
};

export type Action =
  | { type: "SET_CATEGORIES"; payload: Categories[] }
  | { type: "CREATE_CATEGORIES"; payload: Categories }
  | { type: "UPDATE_CATEGORIES"; payload: Categories }
  | { type: "DELETE_CATEGORIES"; payload: string | number }
  | { type: "GET_DETAIL_CATEGORY"; payload: Categories | null }
  | { type: "FILTER_CATEGORIES"; payload: string | number };
