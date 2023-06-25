import { NextFunction, Request, Response } from "express";
import config from "config";
import { createCategory, getAllCategory, getCategoryById } from "../services/category.service";
export const createCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const image = req.file?.filename;
    const category = await createCategory({
      name: req.body.name,
      image: `http://${config.get<string>("db_host")}:${
        config.get<string>("port")
      }/img/${image}`,
    });
    res.status(201).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getCategoryByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryId = Number(req.params.id);
    const category = await getCategoryById(categoryId);
    res.status(200).json({
      status: 'success',
      data: {
        category,
      }
    })

  } catch (error) {
    
  }
}

export const getAllCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    try {
        const categories = await getAllCategory();
        res.status(200).json({
            status: 'success',
            data: {
                categories,
            }
        })
    } catch (err: any) {
        next(err)
    }
};
