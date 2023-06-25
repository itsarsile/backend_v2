import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAddressByUserId = async (userId: string) => {
  const address = await prisma.address.findMany({
    where: { userId },
  });

  return address
};
