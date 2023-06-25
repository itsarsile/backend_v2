import { Category, Prisma, PrismaClient, Product } from "@prisma/client";
import config from "config";
import redisClient from "../utils/connectRedis";

const prisma = new PrismaClient();

export const createProduct = async (
  input: Prisma.ProductCreateInput,
  categoryId: number,
) => {
  return (await prisma.product.create({
    data: {
      ...input,
      category: {
        connect: { id: categoryId },
      },
    },
  })) as Product;
};

export const getAllProducts = async (
  orderBy: Prisma.SortOrder,
  orderByField: string,
  search: string,
) => {
  const or: Prisma.ProductWhereInput = search
    ? {
      OR: [
        { name: { contains: search as string, mode: "insensitive" } },
        { category: { some: { name: { contains: search as string, mode: 'insensitive'} } } },
      ],
    }
    : {};

  return (await prisma.product.findMany({
    where: {
      ...or
    },
    orderBy: {
      [orderByField]: orderBy as Prisma.SortOrder,
    },
    include: {
      category: true,
    },
  }));
};

export const getProductById = async (productId: string) => {
  return (await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      category: true,
    },
  }));
};

export const updateProduct = async (
  productId: string,
  input: Prisma.ProductUpdateInput,
) => {
  return (await prisma.product.update({
    where: { id: productId },
    data: input,
  })) as Product;
};

export const deleteProduct = async (productId: string) => {
  return (await prisma.product.delete({
    where: {
      id: productId,
    },
  }));
};
