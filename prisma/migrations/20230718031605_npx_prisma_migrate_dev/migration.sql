/*
  Warnings:

  - You are about to drop the `_AddressToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AddressToUser" DROP CONSTRAINT "_AddressToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AddressToUser" DROP CONSTRAINT "_AddressToUser_B_fkey";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "_AddressToUser";

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
