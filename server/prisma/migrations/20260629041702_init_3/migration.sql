-- CreateEnum
CREATE TYPE "LedgerTransactionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "LedgerTransaction" ADD COLUMN     "ledgerTransactionStatus" "LedgerTransactionStatus" NOT NULL DEFAULT 'PENDING';
