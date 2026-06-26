/*
  Warnings:

  - You are about to drop the column `proofOfPaymentImageId` on the `LedgerTransaction` table. All the data in the column will be lost.
  - You are about to drop the `ProofOfPaymentImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LedgerTransaction" DROP CONSTRAINT "LedgerTransaction_proofOfPaymentImageId_fkey";

-- AlterTable
ALTER TABLE "Academy" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "LedgerTransaction" DROP COLUMN "proofOfPaymentImageId",
ADD COLUMN     "imageId" TEXT;

-- DropTable
DROP TABLE "ProofOfPaymentImage";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Academy" ADD CONSTRAINT "Academy_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LedgerTransaction" ADD CONSTRAINT "LedgerTransaction_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
