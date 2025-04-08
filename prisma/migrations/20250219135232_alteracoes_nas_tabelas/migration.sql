/*
  Warnings:

  - You are about to drop the column `director` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `imageURL` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `synopse` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `occupierCPF` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `neighboorhood` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Session` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "genere" TEXT NOT NULL,
    "ageRating" TEXT NOT NULL
);
INSERT INTO "new_Movie" ("ageRating", "genere", "id", "title") SELECT "ageRating", "genere", "id", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE TABLE "new_Seat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "row" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "occupierName" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    CONSTRAINT "Seat_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Seat" ("id", "number", "occupierName", "price", "row", "sessionId") SELECT "id", "number", "occupierName", "price", "row", "sessionId" FROM "Seat";
DROP TABLE "Seat";
ALTER TABLE "new_Seat" RENAME TO "Seat";
CREATE TABLE "new_Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startTime" DATETIME NOT NULL,
    "movieId" TEXT NOT NULL,
    CONSTRAINT "Session_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("id", "movieId", "startTime") SELECT "id", "movieId", "startTime" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
