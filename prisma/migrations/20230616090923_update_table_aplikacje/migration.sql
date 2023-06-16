-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aplikacje" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ofertapracy_id" TEXT NOT NULL,
    "uzytkownik_id" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    CONSTRAINT "Aplikacje_ofertapracy_id_fkey" FOREIGN KEY ("ofertapracy_id") REFERENCES "OfertyPracy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Aplikacje_uzytkownik_id_fkey" FOREIGN KEY ("uzytkownik_id") REFERENCES "Uzytkownicy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Aplikacje" ("data", "id", "ofertapracy_id", "status", "uzytkownik_id") SELECT "data", "id", "ofertapracy_id", "status", "uzytkownik_id" FROM "Aplikacje";
DROP TABLE "Aplikacje";
ALTER TABLE "new_Aplikacje" RENAME TO "Aplikacje";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
