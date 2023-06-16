import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { TRoute } from '../types';
import { handleRequest } from '../../utils/request.utils';
import { getOfertyPracy } from '../../services/ofertyPracy.services';

export default {
    method: 'get',
    path: '/api/ofertyPracy',
    validators: [],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => await getOfertyPracy(),
        }),
} as TRoute;
