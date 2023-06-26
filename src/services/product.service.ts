import { Prisma, PrismaClient, Product } from "@prisma/client";
import redisClient from "../utils/connectRedis";
import config from "config";

const prisma = new PrismaClient();
const cacheKey = `Products`;

export const createProduct = async (
  input: Prisma.ProductCreateInput,
  categoryId: number,
) => {
  const createdProduct = await prisma.product.create({
    data: {
      ...input,
      category: {
        connect: { id: categoryId },
      },
    },
  }) as Product;
  redisClient.del(cacheKey);
  return createdProduct;
};

export const getAllProducts = async (
  orderBy: Prisma.SortOrder,
  orderByField: string,
  search: string,
  offset: number,
  limit: number,
) => {
  const cacheKey =
    `Products:${orderBy}:${orderByField}:${search}:${offset}:${limit}`;
  const cachedProducts = await redisClient.get(cacheKey);

  if (cachedProducts) {
    const parsedProducts = JSON.parse(cachedProducts) as Product[];
    return parsedProducts;
  }

  const or: Prisma.ProductWhereInput = search
    ? {
      OR: [
        { name: { contains: search as string, mode: "insensitive" } },
        {
          category: {
            some: { name: { contains: search as string, mode: "insensitive" } },
          },
        },
      ],
    }
    : {};

  const products = await prisma.product.findMany({
    where: or,
    orderBy: {
      [orderByField]: orderBy as Prisma.SortOrder,
    },
    include: {
      category: true,
    },
    skip: offset,
    take: limit,
  });

  await redisClient.set(cacheKey, JSON.stringify(products), {
    EX: config.get<number>("redisCacheExpiresIn") * 60,
  });

  return products;
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
  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: input,
  }) as Product;

  redisClient.del(cacheKey);
  return updatedProduct;
};

export const deleteProduct = async (productId: string) => {
  await redisClient.del(cacheKey);
  return (await prisma.product.delete({
    where: {
      id: productId,
    },
  }));
};
