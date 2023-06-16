import { Request, Response } from 'express';
import { body } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

import { TRoute } from '../types';
import { handleRequest } from '../../utils/request.utils';
import { authorize } from '../../utils/middleware.utils';
import { getAplikacjeNaOfertePracy } from '../../services/aplikacje.services';

export default {
    method: 'get',
    path: '/api/aplikacje/:id',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () =>
                await getAplikacjeNaOfertePracy({
                    id: req.params.id,
                }),
        }),
} as TRoute;
