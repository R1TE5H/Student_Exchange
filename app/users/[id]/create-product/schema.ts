import { z } from "zod";

const schema = z.object({
  name: z.string().min(4, {
    message: "The Product Name must be greater than 4 characters long",
  }),
  price: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Price must be a valid number with at most 2 decimal places"
    )
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, {
      message: "Price must be greater than 0",
    })
    .refine((val) => val < 10000, {
      message: "Price must be less than 10,000",
    }),
  quantity: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Quantity must be a valid number with at most 2 decimal places"
    )
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, {
      message: "Quantity must be greater than 0",
    })
    .refine((val) => val < 10000, {
      message: "Quantity must be less than 10,000",
    }),
  description: z
    .string()
    .min(10, { message: "Description must be longer than 10 characters" }),

  category: z.string().min(1, "Category is required"),
});

export default schema;
