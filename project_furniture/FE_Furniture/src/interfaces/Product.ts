export interface Product {
  _id: string | number;
  productName: string;
  price: number;
  description: string;
  stock: number;
  imageProduct?: string;
  categoriesId: string;
}

export type State = {
  products: Product[];
  selectedProduct?: Product | null;
};

export type Action =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "CREATE_PRODUCTS"; payload: Product }
  | { type: "UPDATE_PRODUCTS"; payload: Product }
  | { type: "DELETE_PRODUCTS"; payload: number | string }
  | { type: "GET_DETAIL_PRODUCT"; payload: Product | null };
