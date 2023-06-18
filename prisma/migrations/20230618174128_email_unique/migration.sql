/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Uzytkownicy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Uzytkownicy_email_key" ON "Uzytkownicy"("email");
