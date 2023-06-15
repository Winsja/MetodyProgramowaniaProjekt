-- CreateTable
CREATE TABLE "OfertyPracy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stanowisko" TEXT NOT NULL,
    "opis" TEXT,
    "lokalizacja" TEXT NOT NULL,
    "dataDodania" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataWygasa" DATETIME NOT NULL,
    "pensja" REAL,
    "wymagania" TEXT
);

-- CreateTable
CREATE TABLE "Uzytkownicy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imie" TEXT NOT NULL,
    "nazwisko" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefon" INTEGER NOT NULL,
    "wyksztalcenie" TEXT NOT NULL,
    "umiejetnosci" TEXT NOT NULL,
    "rola" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Aplikacje" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ofertapracy_id" TEXT NOT NULL,
    "uzytkownik_id" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Aplikacje_ofertapracy_id_fkey" FOREIGN KEY ("ofertapracy_id") REFERENCES "OfertyPracy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Aplikacje_uzytkownik_id_fkey" FOREIGN KEY ("uzytkownik_id") REFERENCES "Uzytkownicy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
