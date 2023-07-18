import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createUserAddress } from "../services/address.service";

const prisma = new PrismaClient();

export const createAddressHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { street, city, state, postalCode, country } = req.body;
    const userId = res.locals.user.id

    const address = await createUserAddress({
      street,
      city,
      state,
      postalCode,
      country,
    }, userId);

    res.status(201).json({
      status: "success",
      data: {
        address,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getAddressByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = res.locals.user.id; // Assuming the authenticated user's ID is available in res.locals.user

    const addresses = await prisma.address.findMany({
      where: { userId },
    });

    res.status(200).json({
      status: "success",
      data: {
        addresses,
      },
    });
  } catch (err) {
    next(err);
  }
};
