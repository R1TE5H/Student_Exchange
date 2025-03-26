import { z } from "zod";

const schema = z.object({
  name: z.string().min(4, {
    message: "The Product Name must be greater than 4 characters long",
  }),
  price: z
    .number()
    .positive({
      message: "Price must be greater than 0",
    })
    .lt(10000, {
      message: "Price must be less than 10,000",
    })
    .finite({
      message: "Price must be a finite number",
    })
    .multipleOf(0.01, {
      message: "Price must have at most 2 decimal places",
    }),
  quantity: z
    .number()
    .positive({
      message: "Quantity must be greater than 0",
    })
    .lt(10000, {
      message: "Quantity must be less than 10,000",
    })
    .finite({
      message: "Quantity must be a finite number",
    })
    .multipleOf(0.01, {
      message: "Quantity must have at most 2 decimal places",
    }),
  userID: z.string().min(10),
  description: z
    .string()
    .min(10, { message: "Description must be longer than 10 characters" }),
});

export default schema;
