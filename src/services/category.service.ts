import { Category, Prisma, PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = async (input: Prisma.CategoryCreateInput) => {
  return (await prisma.category.create({
    data: input,
  })) as Category;
};

export const getAllCategory = async () => {
  return (await prisma.category.findMany({
    include: {
      products: true,
    }
  }))
}