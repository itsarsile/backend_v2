import { Category, Prisma, PrismaClient } from "@prisma/client";

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

export const getCategoryById = async (categoryId: number) => {
  return (await prisma.category.findUnique({
    where: {
      id: categoryId,
    }
  }))
}