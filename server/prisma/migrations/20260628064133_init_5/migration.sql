/*
  Warnings:

  - You are about to drop the column `expectedAmount` on the `Lesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "expectedAmount",
ADD COLUMN     "expectedPaymentAmount" DOUBLE PRECISION;
