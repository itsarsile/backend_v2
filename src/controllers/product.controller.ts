import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import config from "config";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductByUser,
  updateProduct,
} from "../services/product.service";

export const createProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const image = req.file?.filename;
    const userId = res.locals.user.id;
    const categoryId = Number(req.body.categoryId);
    const price = Number(req.body.price);
    const stock = Number(req.body.stock);
    const name = req.body.name;
    if (!name) {
      throw new Error("Product name is missing");
    }

    if (isNaN(price) || isNaN(stock)) {
      throw new Error("Invalid price or stock value");
    }

    const product = await createProduct(
      {
        name,
        description: req.body.description,
        price,
        image: `http://${config.get<string>("db_host")}:${
          config.get<string>(
            "port",
          )
        }/img/${image}`,
        stock,
      },
      categoryId,
      userId,
    );

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
    const { orderBy, orderByField, search, page, limit } = req.query;
    const pageNumber = parseInt(page as string, 10) || 1;
    const limitNumber = parseInt(limit as string, 10) || 10;
    const offset = (pageNumber - 1) * limitNumber;
    const products = await getAllProducts(
      orderBy as Prisma.SortOrder || undefined,
      orderByField as string,
      search as string,
      offset,
      limitNumber,
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

export const getProductByUserHandler = async (
  req: Request,
  res: Response,  
  next: NextFunction,
) => {
  try {
    const userId = req.params.id;
    const products = await getProductByUser(userId);
    res.status(200).json({
      status: "success",
      data: {
        products: products,
      }
    })
  } catch (err: any) {
    next(err);
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
      stock: Number(req.body.stock) || undefined,
      price: Number(req.body.price) || undefined,
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
