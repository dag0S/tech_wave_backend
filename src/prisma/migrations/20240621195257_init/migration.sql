-- CreateTable
CREATE TABLE "favoriteDevice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "favoritesListId" INTEGER NOT NULL,
    CONSTRAINT "favoriteDevice_favoritesListId_fkey" FOREIGN KEY ("favoritesListId") REFERENCES "FavoritesList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
