import { z } from "zod";

const orderValidationSchema = z.object({
  productName: z.string().min(1).max(255),
  price: z.number().min(0),
  quantity: z.number().min(1),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string().min(1).max(25),
    lastName: z.string().min(1).max(25),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(orderValidationSchema).optional().default([]),
});

export default userValidationSchema;
