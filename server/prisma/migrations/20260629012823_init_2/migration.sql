/*
  Warnings:

  - You are about to drop the column `payrollId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `totalDeductions` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `payrollId` on the `Subscription` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_payrollId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_payrollId_fkey";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "payrollId";

-- AlterTable
ALTER TABLE "Payroll" DROP COLUMN "totalDeductions";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "payrollId";
