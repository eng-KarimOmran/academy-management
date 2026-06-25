/*
  Warnings:

  - Changed the type of `platform` on the `SocialMedia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('FACEBOOK', 'TIKTOK', 'INSTAGRAM', 'TWITTER', 'YOUTUBE', 'LINKEDIN', 'SNAPCHAT', 'WHATSAPP');

-- AlterTable
ALTER TABLE "SocialMedia" DROP COLUMN "platform",
ADD COLUMN     "platform" "Platform" NOT NULL;
