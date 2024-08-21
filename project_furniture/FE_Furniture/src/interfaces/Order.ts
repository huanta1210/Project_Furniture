export interface YourOrder {
  _id?: string;
  quantity: number;
  price: number;
  productId: string;
}

export interface ProductOrder {
  imageProduct: string;
  productName: string;
}
