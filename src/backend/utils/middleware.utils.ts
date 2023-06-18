import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwt.utils';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const TOKEN = (process.env.TOKEN_SECRET as string) ?? 'tajnytoken';

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const parsedToken = token?.replace('Bearer', '');
    const result = verifyToken(parsedToken ?? '', TOKEN);

    // jeśli nie ma tokenu lub token nieprawidłowy
    if (!token || !result.isValid) {
        res.send(StatusCodes.UNAUTHORIZED).json({
            errors: [ReasonPhrases.UNAUTHORIZED],
        });
    } else {
        next(); // wróć do wykonywanej funkcji
    }
};
