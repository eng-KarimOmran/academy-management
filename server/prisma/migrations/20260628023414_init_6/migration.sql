/*
  Warnings:

  - You are about to drop the `TrainingDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TrainingDetails" DROP CONSTRAINT "TrainingDetails_courseId_fkey";

-- DropTable
DROP TABLE "TrainingDetails";

-- CreateTable
CREATE TABLE "CourseFeature" (
    "id" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "CourseFeature_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseFeature" ADD CONSTRAINT "CourseFeature_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
