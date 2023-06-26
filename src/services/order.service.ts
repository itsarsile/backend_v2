import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateOrderInput {
  userId: string;
  addressId: string;
  orderItems: { productId: string; quantity: number }[];
}

export const createOrder = async (
  { userId, addressId, orderItems }: CreateOrderInput,
) => {
  let totalPrice = 0;

  for (const item of orderItems) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });

    if (product) {
      totalPrice += product.price * item.quantity;
    }
  }

  const order = await prisma.order.create({
    data: {
      user: { connect: { id: userId } },
      status: "pending",
      address: { connect: { id: addressId } },
      totalPrice,
      orderItems: {
        create: orderItems.map((item) => ({
          product: { connect: { id: item.productId } },
          quantity: item.quantity,
        })),
      },
    },
  });

  return order;
};


// export const updateOrderItems = async (orderId: string, orderItems: { productId: string; quantity: number }[]) => {
//   const updatedOrder = await prisma.$transaction(async (prismaClient) => {
//     const existingOrder = await prismaClient.order.findUnique({
//       where: { id: orderId },
//       include: { orderItems: true },
//     });
//     console.log(existingOrder)
//     if (!existingOrder) {
//       throw new Error("Order not found");
//     }

//     const updatedOrderItems = await prismaClient.orderItem.createMany({
//       data: orderItems.map((item) => ({
//         orderId,
//         productId: item.productId,
//         quantity: item.quantity,
//       })),
//     });

//     const updatedOrder = {
//       ...existingOrder,
//       orderItems: updatedOrderItems,
//     };

//     return updatedOrder;
//   });

//   return updatedOrder;
// };


export const getOrders = async (userId: string) => {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      orderItems: true,
      address: true,
    },
  });
};

export const getOrderById = async (orderId: string) => {
  return prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderItems: true,
      address: true,
    },
  });
};

export const deleteOrder = async (orderId: string) => {
  await prisma.orderItem.deleteMany({
    where: {
      orderId,
    },
  });

  return await prisma.order.delete({
    where: {
      id: orderId,
    },
  });
};
