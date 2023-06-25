/*
  Warnings:

  - You are about to drop the column `orderId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `users` table. All the data in the column will be lost.
  - Made the column `userId` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `productId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_orderId_fkey";

-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_orderId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_orderId_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "orderId",
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "totalPrice",
ADD COLUMN     "addressId" TEXT,
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "orderId";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
