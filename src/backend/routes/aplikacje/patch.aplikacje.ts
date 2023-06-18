import { Request, Response } from 'express';
import { body } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

import { TRoute } from '../types';
import { handleRequest } from '../../utils/request.utils';
import { authorize } from '../../utils/middleware.utils';
import {
    updateAplikacjaNaOfertePracy,
    TAplikacje,
} from '../../services/aplikacje.services';

export default {
    method: 'patch',
    path: '/api/aplikacje',
    validators: [
        authorize,
        body('id').notEmpty().isString(),
        body('status').notEmpty().isString(),
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () =>
                await updateAplikacjaNaOfertePracy(req.body as TAplikacje),
        }),
} as TRoute;
