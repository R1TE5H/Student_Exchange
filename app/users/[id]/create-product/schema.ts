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
});

export default schema;
