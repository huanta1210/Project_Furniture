export interface Product {
  _id: string | number;
  productName: string;
  price: number | null;
  description: string;
  stock: number | null;
  imageProduct?: string | FileList;
  categoriesId: string;
}

export type State = {
  products: Product[];
};

export type Action =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "CREATE_PRODUCTS"; payload: Product }
  | { type: "UPDATE_PRODUCTS"; payload: Product }
  | { type: "DELETE_PRODUCTS"; payload: number | string };
