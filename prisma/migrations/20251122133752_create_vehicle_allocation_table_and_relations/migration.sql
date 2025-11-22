-- CreateTable
CREATE TABLE "allocations" (
    "allocation_id" TEXT NOT NULL PRIMARY KEY,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME,
    "reason" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "driver_id" TEXT,
    CONSTRAINT "allocations_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles" ("vehicle_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "allocations_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers" ("driver_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "allocations_vehicle_id_idx" ON "allocations"("vehicle_id");

-- CreateIndex
CREATE INDEX "allocations_driver_id_idx" ON "allocations"("driver_id");
