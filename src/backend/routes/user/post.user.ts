import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { v4 } from 'uuid';
import { prisma } from '../../database';
import { body } from 'express-validator';
import { handleRequest } from '../../utils/request.utils';
import { createHash } from '../../utils/hash.utils';
import { TRoute } from '../types';

const SALT = (process.env.PASSWORD_SALT as string) ?? 'OJEJU';

export default {
    method: 'post',
    path: '/api/user',
    validators: [
        body('email').isEmail(),
        body('haslo').notEmpty().isString(),
        body('imie').notEmpty().isString(),
        body('nazwisko').notEmpty().isString(),
        body('wyksztalcenie').notEmpty().isString(),
        body('umiejetnosci').notEmpty().isString(),
        body('rola').notEmpty().contains('Pracownik') ||
            body('rola').notEmpty().contains('Pracodawca'),
        body('telefon').isInt(),
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            messages: {
                uniqueConstraintFailed: 'Email must be unique.',
            },
            execute: async () => {
                const {
                    imie,
                    nazwisko,
                    email,
                    haslo,
                    telefon,
                    wyksztalcenie,
                    umiejetnosci,
                    rola,
                } = req.body;
                const passwordHash = createHash(haslo, SALT);
                return await prisma.uzytkownicy.create({
                    data: {
                        id: v4(),
                        imie,
                        nazwisko,
                        email,
                        haslo: passwordHash,
                        telefon,
                        wyksztalcenie,
                        umiejetnosci,
                        rola,
                    },
                });
            },
        }),
} as TRoute;
