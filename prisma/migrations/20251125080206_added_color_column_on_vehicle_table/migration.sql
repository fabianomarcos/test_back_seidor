/*
  Warnings:

  - Added the required column `color` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_vehicles" (
    "vehicle_id" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_vehicles" ("brand", "created_at", "plate", "updated_at", "vehicle_id") SELECT "brand", "created_at", "plate", "updated_at", "vehicle_id" FROM "vehicles";
DROP TABLE "vehicles";
ALTER TABLE "new_vehicles" RENAME TO "vehicles";
CREATE UNIQUE INDEX "vehicles_plate_key" ON "vehicles"("plate");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
