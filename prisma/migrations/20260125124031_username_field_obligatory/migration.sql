/*
  Warnings:

  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "isSuperuser" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "id", "isActive", "isSuperuser", "lastLogin", "password", "username") SELECT "createdAt", "email", "id", "isActive", "isSuperuser", "lastLogin", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
