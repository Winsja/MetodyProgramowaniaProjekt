import { Request, Response } from 'express';
import { body, param } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

import { TRoute } from '../types';
import { handleRequest } from '../../utils/request.utils';
import { authorize } from '../../utils/middleware.utils';
import { getAplikacjeNaOfertyPracyByPracownik } from '../../services/aplikacje.services';

export default {
    method: 'get',
    path: '/api/aplikacje/user/:idPracownika',
    validators: [authorize, param('idPracownika').notEmpty()],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () =>
                await getAplikacjeNaOfertyPracyByPracownik({
                    id: req.params.idPracownika,
                }),
        }),
} as TRoute;
