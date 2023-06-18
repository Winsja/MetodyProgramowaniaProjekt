import { getUzytkownicyByRola } from '../../services/user.services';
import { Request, Response } from 'express';
import { param } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

import { TRoute } from '../types';
import { handleRequest } from '../../utils/request.utils';

export default {
    method: 'get',
    path: '/api/user/:rola',
    validators: [param('rola').notEmpty().isString()],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () =>
                await getUzytkownicyByRola({
                    rola: req.params.rola,
                }),
        }),
} as TRoute;
