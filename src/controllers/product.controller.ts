import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import config from "config";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../services/product.service";
import { orderBy } from "lodash";

export const createProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const image = req.file?.filename;
    const categoryId = Number(req.body.categoryId);
    const product = await createProduct({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      image: `http://${config.get<string>("db_host")}:${
        config.get<string>("port")
      }/img/${image}`,
      stock: Number(req.body.stock),
    }, categoryId);
    res.status(201).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getAllProductsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { orderBy, orderByField, search } = req.query;
    const products = await getAllProducts(
      orderBy as Prisma.SortOrder || undefined,
      orderByField as string, search as string
    );
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getProductByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err: any) {
  }
};

export const updateProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const image = req.file?.filename;
    const productId = req.params.id;
    const product = await updateProduct(productId, {
      name: req.body.name,
      description: req.body.description,
      image: `http://${config.get<string>("db_host")}:${
        config.get<string>("port")
      }/img/${image}`,
      stock: Number(req.body.stock),
      price: Number(req.body.price),
    });

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req.params.id;
    const product = await deleteProduct(productId);
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
