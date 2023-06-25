import { number, object, string, TypeOf } from "zod";

export const createProductSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    description: string().optional(),
    image: string().optional(),
    price: number({
      required_error: "Price is required",
    }),
    stock: number({
      required_error: "Stock is required",
    }),
  }),
});

export const updateProductSchema = object({
  body: object({
    name: string().optional(),
    description: string().optional(),
    image: string().optional(),
    price: number().optional(),
    stock: number().optional(),
  }),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>["body"];
export type UpdateProductInput = TypeOf<typeof updateProductSchema>["body"];
