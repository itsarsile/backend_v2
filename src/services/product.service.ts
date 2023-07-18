import { Prisma, PrismaClient, Product } from "@prisma/client";
import redisClient from "../utils/connectRedis";

const prisma = new PrismaClient();
const cacheKey = `Products`;

export const createProduct = async (
  input: Prisma.ProductCreateInput,
  categoryId: number,
  userId: string,
) => {
  const createdProduct = await prisma.product.create({
    data: {
      ...input,
      category: {
        connect: { id: categoryId },
      },
      User: { connect: { id: userId } },
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


  return products;
};

export const getProductById = async (productId: string) => {
  return (await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      category: true,
      User: {
        select: {
          name: true,
        }
      },
    }
  }));
};

export const getProductByUser = async (userId: string) => {
  const products = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      products: true,
    }
  });
  return products
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
