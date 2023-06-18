import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { TRoute } from '../types';
import { handleRequest } from '../../utils/request.utils';
import { TUser, updateUser } from '../../services/user.services';
import { authorize } from '../../utils/middleware.utils';
import { body } from 'express-validator';

export default {
    method: 'patch',
    path: '/api/user',
    validators: [
        authorize,
        body('id').notEmpty(),
        body('imie').notEmpty().isString(),
        body('nazwisko').notEmpty().isString(),
        body('email').notEmpty().isEmail(),
        body('telefon').notEmpty().isInt(),
        body('wyksztalcenie').notEmpty().isString(),
        body('umiejetnosci').notEmpty().isString(),
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => await updateUser(req.body as TUser),
        }),
} as TRoute;
