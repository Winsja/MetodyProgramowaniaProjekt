import { prisma } from '../database';
import { v4 } from 'uuid';

export type TOfertaPracy = {
    id: string;
    stanowisko: string;
    opis: string;
    lokalizacja: string;
    dataWygasa: Date;
    pensja: number;
    wymagania: string;
};

export const createOfertaPracy = async ({
    stanowisko,
    opis,
    lokalizacja,
    dataWygasa,
    pensja,
    wymagania,
}: Omit<TOfertaPracy, 'id'>) => {
    return prisma.ofertyPracy.create({
        data: {
            id: v4(),
            stanowisko,
            opis,
            lokalizacja,
            dataWygasa,
            pensja,
            wymagania,
        },
    });
};

export const updateOfertaPracy = async ({
    id,
    stanowisko,
    opis,
    lokalizacja,
    dataWygasa,
    pensja,
    wymagania,
}: TOfertaPracy) => {
    return prisma.ofertyPracy.update({
        data: {
            stanowisko,
            opis,
            lokalizacja,
            dataWygasa,
            pensja,
            wymagania,
        },
        where: {
            id,
        },
    });
};

export const getOfertyPracy = async () => await prisma.ofertyPracy.findMany();

export const getOfertyPracyByPracodawca = async ({ id }: { id: string }) =>
    await prisma.uzytkownicy.findMany({
        where: {
            id,
        },
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
                },
            },
        },
    });

export const deleteOfertaPracy = async ({ id }: { id: string }) =>
    await prisma.ofertyPracy.delete({
        where: {
            id,
        },
    });
