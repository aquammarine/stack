/*
  Warnings:

  - You are about to drop the column `repetition` on the `review_cards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "review_cards" DROP COLUMN "repetition",
ADD COLUMN     "repetitions" INTEGER NOT NULL DEFAULT 0;
