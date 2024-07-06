-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BasketDevice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "count" INTEGER NOT NULL DEFAULT 0,
    "basketId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,
    CONSTRAINT "BasketDevice_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BasketDevice_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BasketDevice" ("basketId", "count", "deviceId", "id") SELECT "basketId", "count", "deviceId", "id" FROM "BasketDevice";
DROP TABLE "BasketDevice";
ALTER TABLE "new_BasketDevice" RENAME TO "BasketDevice";
PRAGMA foreign_key_check("BasketDevice");
PRAGMA foreign_keys=ON;
