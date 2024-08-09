import z from "zod";

export const formSchema = z.object({
  userName: z.string().nonempty("Name is required").min(3).max(255),
  phone: z
    .string()
    .nonempty("Phone is required")
    .min(10, "Phone number must be at least 10 characters long")
    .max(15, "Phone number can be at most 15 characters long"),
  email: z
    .string()
    .nonempty("Email is required")
    .max(255)
    .email("Email format is incorrect."),
  address: z.string().nonempty("Address is required").min(6).max(255),
  province: z.string().nonempty("Please select a province"),
  district: z.string().nonempty("Please select a district"),
  ward: z.string().nonempty("Please select a ward"),
});
