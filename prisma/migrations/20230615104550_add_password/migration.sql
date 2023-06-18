/*
  Warnings:

  - Added the required column `haslo` to the `Uzytkownicy` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Uzytkownicy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imie" TEXT NOT NULL,
    "nazwisko" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "haslo" TEXT NOT NULL,
    "telefon" INTEGER NOT NULL,
    "wyksztalcenie" TEXT NOT NULL,
    "umiejetnosci" TEXT NOT NULL,
    "rola" TEXT NOT NULL
);
INSERT INTO "new_Uzytkownicy" ("email", "id", "imie", "nazwisko", "rola", "telefon", "umiejetnosci", "wyksztalcenie") SELECT "email", "id", "imie", "nazwisko", "rola", "telefon", "umiejetnosci", "wyksztalcenie" FROM "Uzytkownicy";
DROP TABLE "Uzytkownicy";
ALTER TABLE "new_Uzytkownicy" RENAME TO "Uzytkownicy";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
