export interface Product {
  _id: string | number;
  productName: string;
  price: number;
  description: string;
  stock: number;
  imageProduct: string;
  createdAt?: string;
}
