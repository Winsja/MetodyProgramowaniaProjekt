import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { TRoute } from '../types';
import { handleRequest } from '../../utils/request.utils';
import { getOfertyPracyByPracodawca } from '../../services/ofertyPracy.services';
import { param } from 'express-validator';

export default {
    method: 'get',
    path: '/api/ofertyPracy/:idPracodawcy',
    validators: [param('idPracodawcy').notEmpty()],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () =>
                await getOfertyPracyByPracodawca({
                    id: req.params.idPracodawcy,
                }),
        }),
} as TRoute;
