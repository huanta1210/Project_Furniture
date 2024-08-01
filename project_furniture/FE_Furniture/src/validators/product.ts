import * as z from "zod";

export const productSchema = z.object({
  productName: z.string().min(3).max(255),
  price: z.number().min(1),
  description: z.string().min(3),
  stock: z.number().min(1),
  imageProduct: z.union([z.instanceof(FileList), z.string()]),
  categoriesId: z.string().min(1),
});
