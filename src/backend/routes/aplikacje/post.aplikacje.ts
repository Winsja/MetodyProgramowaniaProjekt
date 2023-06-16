import { Request, Response } from 'express';
import { body } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

import { TRoute } from '../types';
import { handleRequest } from '../../utils/request.utils';
import { authorize } from '../../utils/middleware.utils';
import {
    createAplikacjaNaOfertePracy,
    TAplikacje,
} from '../../services/aplikacje.services';

export default {
    method: 'post',
    path: '/api/aplikacje',
    validators: [
        authorize,
        body('ofertapracy_id').notEmpty().isString(),
        body('uzytkownik_id').notEmpty().isString(),
        body('status').notEmpty().isString(),
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () =>
                await createAplikacjaNaOfertePracy(
                    req.body as Omit<TAplikacje, 'id'>,
                ),
        }),
} as TRoute;
