import { object, string, TypeOf } from "zod";

export const createOrderSchema = object({
  body: object({
    orderItems: string().array().nonempty(),
  }),
});

export type CreateOrderInput = TypeOf<typeof createOrderSchema>["body"];
