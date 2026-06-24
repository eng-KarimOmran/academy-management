/*
  Warnings:

  - The values [trainer,secretary,manager] on the enum `JobProfileType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "JobProfileType_new" AS ENUM ('TRAINER', 'SECRETARY', 'MANAGER');
ALTER TABLE "JobProfile" ALTER COLUMN "jobProfileType" TYPE "JobProfileType_new" USING ("jobProfileType"::text::"JobProfileType_new");
ALTER TYPE "JobProfileType" RENAME TO "JobProfileType_old";
ALTER TYPE "JobProfileType_new" RENAME TO "JobProfileType";
DROP TYPE "public"."JobProfileType_old";
COMMIT;
