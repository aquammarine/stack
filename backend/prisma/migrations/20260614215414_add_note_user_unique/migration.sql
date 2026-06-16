/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `notes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "notes_id_userId_key" ON "notes"("id", "userId");
