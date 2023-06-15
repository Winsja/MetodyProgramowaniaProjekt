import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Request, Response } from 'express';
import { v4, validate } from 'uuid';
import { prisma } from '../../database';
import { body } from 'express-validator';
import { TCustomError, handleRequest } from '../../utils/request.utils';
import { createHash } from '../../utils/hash.utils';
import { TRoute } from '../types';
import { createToken } from '../../utils/jwt.utils';

const SALT = (process.env.PASSWORD_SALT as string) ?? 'OJEJU';
const TOKEN = (process.env.TOKEN_SECRET as string) ?? 'tajnytoken';

export default {
    method: 'get',
    path: '/api/login',
    validators: [body('email').isEmail(), body('haslo').notEmpty()],
    handler: async (req: Request, res: Response) => {
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            responseFailStatus: StatusCodes.UNAUTHORIZED,
            execute: async () => {
                const { email, haslo } = req.body;
                const passwordHash = createHash(haslo, SALT);
                const user = await prisma.uzytkownicy.findFirst({
                    where: { email },
                });
                const passwordValid = user
                    ? user.haslo === passwordHash //return true
                    : false;

                // Błąd jeśli nie ma użytkownika lub niepoprawne hasło
                if (!user || !passwordValid) {
                    throw {
                        status: StatusCodes.UNAUTHORIZED,
                        message: ReasonPhrases.UNAUTHORIZED,
                        isCustomError: true,
                    } as TCustomError;
                }
                return {
                    token: createToken(user, TOKEN, '7d'),
                };
            },
        });
    },
} as TRoute;
