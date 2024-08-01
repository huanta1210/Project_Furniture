import * as z from "zod";

export const categorySchema = z.object({
  categoryName: z.string().trim().min(3),
  slug: z.string().trim().min(3),
});
