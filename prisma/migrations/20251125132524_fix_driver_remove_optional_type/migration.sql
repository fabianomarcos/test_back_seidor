/*
  Warnings:

  - Made the column `driver_id` on table `allocations` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_allocations" (
    "allocation_id" TEXT NOT NULL PRIMARY KEY,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME,
    "reason" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    CONSTRAINT "allocations_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles" ("vehicle_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "allocations_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers" ("driver_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_allocations" ("allocation_id", "created_at", "driver_id", "end_date", "reason", "start_date", "updated_at", "vehicle_id") SELECT "allocation_id", "created_at", "driver_id", "end_date", "reason", "start_date", "updated_at", "vehicle_id" FROM "allocations";
DROP TABLE "allocations";
ALTER TABLE "new_allocations" RENAME TO "allocations";
CREATE INDEX "allocations_vehicle_id_idx" ON "allocations"("vehicle_id");
CREATE INDEX "allocations_driver_id_idx" ON "allocations"("driver_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
