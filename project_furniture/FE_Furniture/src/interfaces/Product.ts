export interface Product {
  _id: string | number;
  productName: string;
  price: number;
  description: string;
  stock: number;
  imageProduct: string;
  createdAt?: string;
}

export interface ProductAdd {
  _id: string | number;
  productName: string;
  price: number;
  description: string;
  stock: number;
  imageProduct: FileList | string | null;
  categoriesId: string;
}
