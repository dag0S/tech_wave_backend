/*
  Warnings:

  - You are about to drop the `favoriteDevice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deviceId` to the `BasketDevice` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "favoriteDevice";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "FavoriteDevice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "favoritesListId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,
    CONSTRAINT "FavoriteDevice_favoritesListId_fkey" FOREIGN KEY ("favoritesListId") REFERENCES "FavoritesList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FavoriteDevice_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BasketDevice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "basketId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,
    CONSTRAINT "BasketDevice_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BasketDevice_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BasketDevice" ("basketId", "id") SELECT "basketId", "id" FROM "BasketDevice";
DROP TABLE "BasketDevice";
ALTER TABLE "new_BasketDevice" RENAME TO "BasketDevice";
CREATE UNIQUE INDEX "BasketDevice_deviceId_key" ON "BasketDevice"("deviceId");
PRAGMA foreign_key_check("BasketDevice");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteDevice_deviceId_key" ON "FavoriteDevice"("deviceId");
