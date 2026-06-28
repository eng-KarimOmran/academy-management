/*
  Warnings:

  - You are about to drop the column `ledgerTransactionId` on the `Payroll` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payroll" DROP CONSTRAINT "Payroll_ledgerTransactionId_fkey";

-- DropIndex
DROP INDEX "Payroll_ledgerTransactionId_key";

-- AlterTable
ALTER TABLE "FinancialAccount" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Payroll" DROP COLUMN "ledgerTransactionId";
