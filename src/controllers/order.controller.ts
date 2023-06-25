import { NextFunction, Request, Response } from "express";
import {
  createOrder,
  deleteOrder,
  getOrders,
} from "../services/order.service";
import AppError from "../utils/appError";

export const createOrderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = res.locals.user.id;
    const addressId = req.query.addressId as string;
    const { orderItems } = req.body;
    console.log(orderItems);
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


