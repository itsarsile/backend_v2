import { NextFunction, Request, Response } from "express";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
} from "../services/order.service";

export const createOrderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = res.locals.user.id;
    const addressId = req.query.addressId as string;
    const { orderItems } = req.body;
    const order = await createOrder({ userId, addressId, orderItems });

    res.status(201).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = res.locals.user.id;
    const orders = await getOrders(userId);

    res.status(200).json({
      status: "success",
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orderId = req.params.id;
    const order = await getOrderById(orderId);

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
};


// export const updateOrderItemsHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const orderId = req.params.id;
//     const { orderItems } = req.body;
    
//     const updatedOrder = await updateOrderItems(orderId, orderItems);

//     res.status(200).json({
//       status: "success",
//       data: {
//         order: updatedOrder,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteOrderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orderId = req.params.id;
    const order = await deleteOrder(orderId);

    res.status(200).json({
      status: "success",
      order,
    });
  } catch (error) {
    next(error);
  }
};
