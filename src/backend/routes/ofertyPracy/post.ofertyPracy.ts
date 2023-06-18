import { Request, Response } from 'express';
import { body } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

import { TRoute } from '../types';
import { handleRequest } from '../../utils/request.utils';
import { authorize } from '../../utils/middleware.utils';
import {
    createOfertaPracy,
    TOfertaPracy,
} from '../../services/ofertyPracy.services';

export default {
    method: 'post',
    path: '/api/ofertyPracy',
    validators: [
        authorize,
        body('stanowisko').notEmpty().isString(),
        body('lokalizacja').notEmpty().isString(),
        body('dataWygasa').notEmpty().toDate(), //"dataWygasa": "08-16-2023", format MM-DD-Y
        body('pensja').notEmpty().isNumeric(),
        body('wymagania').notEmpty().isString(),
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () =>
                await createOfertaPracy(req.body as Omit<TOfertaPracy, 'id'>),
        }),
} as TRoute;
