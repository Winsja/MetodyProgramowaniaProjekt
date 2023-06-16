import { prisma } from '../database';
import { v4 } from 'uuid';

export type TAplikacje = {
    id: string;
    ofertapracy_id: string;
    uzytkownik_id: string;
    status: string;
};

export const createAplikacjaNaOfertePracy = async ({
    ofertapracy_id,
    uzytkownik_id,
    status,
}: Omit<TAplikacje, 'id'>) => {
    return prisma.aplikacje.create({
        data: {
            id: v4(),
            ofertapracy_id,
            uzytkownik_id,
            status,
        },
    });
};

export const updateAplikacjaNaOfertePracy = async ({
    id,
    status,
}: TAplikacje) => {
    return prisma.aplikacje.update({
        data: {
            status,
        },
        where: {
            id,
        },
    });
};

export const getAplikacjeNaOfertyPracy = async () =>
    await prisma.aplikacje.findMany();

export const getAplikacjeNaOfertePracy = async ({ id }: { id: string }) =>
    await prisma.ofertyPracy.findMany({
        where: { id },
        include: {
            Aplikacje: {
                select: {
                    uzytkownicy: {
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
                    },
                    status: true,
                },
            },
        },
    });

export const getAplikacjeNaOfertyPracyByPracownik = async ({
    id,
}: {
    id: string;
}) =>
    await prisma.uzytkownicy.findMany({
        where: { id },
        include: {
            Aplikacje: {
                select: {
                    ofertypracy: {
                        select: {
                            id: true,
                            stanowisko: true,
                            opis: true,
                            lokalizacja: true,
                            dataWygasa: true,
                            pensja: true,
                            wymagania: true,
                        },
                    },
                    status: true,
                },
            },
        },
    });

export const deleteAplikacjaNaOfertePracy = async ({ id }: { id: string }) =>
    await prisma.aplikacje.delete({
        where: {
            id,
        },
    });
