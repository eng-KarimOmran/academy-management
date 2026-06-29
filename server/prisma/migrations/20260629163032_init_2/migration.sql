/*
  Warnings:

  - The values [ACTIVE_LIMITED] on the enum `SubscriptionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionStatus_new" AS ENUM ('PENDING_DEPOSIT', 'PENDING_FIRST_SESSION', 'GRACE_PERIOD', 'SUSPENDED', 'ACTIVE', 'CANCELED', 'COMPLETED');
ALTER TABLE "public"."Subscription" ALTER COLUMN "subscriptionStatus" DROP DEFAULT;
ALTER TABLE "Subscription" ALTER COLUMN "subscriptionStatus" TYPE "SubscriptionStatus_new" USING ("subscriptionStatus"::text::"SubscriptionStatus_new");
ALTER TYPE "SubscriptionStatus" RENAME TO "SubscriptionStatus_old";
ALTER TYPE "SubscriptionStatus_new" RENAME TO "SubscriptionStatus";
DROP TYPE "public"."SubscriptionStatus_old";
ALTER TABLE "Subscription" ALTER COLUMN "subscriptionStatus" SET DEFAULT 'PENDING_DEPOSIT';
COMMIT;
