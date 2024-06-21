/*
  Warnings:

  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Category" ("id") SELECT "id" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
CREATE TABLE "new_Brand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Brand" ("id") SELECT "id" FROM "Brand";
DROP TABLE "Brand";
ALTER TABLE "new_Brand" RENAME TO "Brand";
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");
PRAGMA foreign_key_check("Category");
PRAGMA foreign_key_check("Brand");
PRAGMA foreign_keys=ON;
