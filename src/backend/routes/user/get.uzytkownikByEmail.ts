import { getUzytkownikByEmail } from '../../services/user.services';
import { Request, Response } from 'express';
import { param } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

import { TRoute } from '../types';
import { handleRequest } from '../../utils/request.utils';

export default {
    method: 'get',
    path: '/api/user/:email',
    validators: [param('email').notEmpty().isString()],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () =>
                await getUzytkownikByEmail({
                    email: req.params.email,
                }),
        }),
} as TRoute;
