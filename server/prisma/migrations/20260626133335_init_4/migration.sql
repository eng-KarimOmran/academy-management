/*
  Warnings:

  - You are about to drop the `ClientPhone` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone,academyId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClientPhone" DROP CONSTRAINT "ClientPhone_academyId_fkey";

-- DropForeignKey
ALTER TABLE "ClientPhone" DROP CONSTRAINT "ClientPhone_clientId_fkey";

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "JobProfile" ALTER COLUMN "supportType" DROP NOT NULL;

-- DropTable
DROP TABLE "ClientPhone";

-- CreateIndex
CREATE UNIQUE INDEX "Client_phone_academyId_key" ON "Client"("phone", "academyId");
