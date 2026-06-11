/*
  Warnings:

  - The values [TO_USER,FROM_USER] on the enum `LedgerCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "ReferenceCategory" AS ENUM ('lessonId', 'paymentId', 'ledgerId');

-- AlterEnum
BEGIN;
CREATE TYPE "LedgerCategory_new" AS ENUM ('FROM_CUSTOMER', 'TO_CUSTOMER', 'FROM_ACADEMY', 'TO_ACADEMY', 'BONUS', 'PENALTY');
ALTER TABLE "LedgerTransaction" ALTER COLUMN "category" TYPE "LedgerCategory_new" USING ("category"::text::"LedgerCategory_new");
ALTER TYPE "LedgerCategory" RENAME TO "LedgerCategory_old";
ALTER TYPE "LedgerCategory_new" RENAME TO "LedgerCategory";
DROP TYPE "public"."LedgerCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "LedgerTransaction" ADD COLUMN     "referenceCategory" "ReferenceCategory" NOT NULL DEFAULT 'ledgerId';
