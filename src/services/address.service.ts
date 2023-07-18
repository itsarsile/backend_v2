import { Address, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getAddressByUserId = async (userId: string) => {
  const address = await prisma.address.findMany({
    where: { userId },
  });

  return address
};

export const createUserAddress = async (input: Prisma.AddressCreateInput, userId: string) => {
  const address = await prisma.address.create({
    data: {
      street: input.street,
      city: input.city,
      state: input.state,
      postalCode: input.postalCode,
      country: input.country,
      user: {
        connect: { id: userId }
      }
    }
  }) as Address
  return address
}
