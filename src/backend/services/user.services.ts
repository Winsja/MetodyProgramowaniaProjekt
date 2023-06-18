import { prisma } from '../database';

export type TUser = {
    id: string;
    imie: string;
    nazwisko: string;
    email: string;
    haslo: string;
    telefon: number;
    wyksztalcenie: string;
    umiejetnosci: string;
    rola: string;
};

export const getUzytkownicyByRola = async ({ rola }: { rola: string }) =>
    await prisma.uzytkownicy.findMany({
        where: {
            rola,
        },
        select: {
            id: true,
            imie: true,
            nazwisko: true,
            email: true,
            telefon: true,
            wyksztalcenie: true,
            umiejetnosci: true,
            rola: true,
        },
    });

//TUTAJ COŚ NIE DZIAŁA
export const getUzytkownikByEmail = async ({ email }: { email: string }) =>
    await prisma.uzytkownicy.findMany({
        where: {
            email,
        },
        select: {
            imie: true,
            nazwisko: true,
            email: true,
            telefon: true,
            wyksztalcenie: true,
            umiejetnosci: true,
        },
    });

export const updateUser = async ({
    id,
    imie,
    nazwisko,
    email,
    telefon,
    wyksztalcenie,
    umiejetnosci,
}: TUser) =>
    await prisma.uzytkownicy.update({
        data: {
            imie,
            nazwisko,
            email,
            telefon,
            wyksztalcenie,
            umiejetnosci,
        },
        where: {
            id,
        },
    });

// export const deleteUser = async ({ id }: { id: string }) =>
//     await prisma.uzytkownicy.delete({
//         where: {
//             id,
//         },
//     });
