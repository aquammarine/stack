/*
  Warnings:

  - You are about to drop the column `nextReview` on the `ReviewCard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReviewCard" DROP COLUMN "nextReview",
ADD COLUMN     "nextReviewAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
