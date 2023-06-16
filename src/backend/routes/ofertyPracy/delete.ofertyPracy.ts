import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { TRoute } from '../types';
import { handleRequest } from '../../utils/request.utils';
import { authorize } from '../../utils/middleware.utils';
import { param } from 'express-validator';
import { deleteOfertaPracy } from '../../services/ofertyPracy.services';

export default {
    method: 'delete',
    path: '/api/ofertyPracy/:id',
    validators: [authorize, param('id').notEmpty()],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => await deleteOfertaPracy({ id: req.params.id }),
        }),
} as TRoute;
