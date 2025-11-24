/*
  Warnings:

  - A unique constraint covering the columns `[plate]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "drivers_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_plate_key" ON "vehicles"("plate");
