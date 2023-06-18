import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export type TPrismaErrorDescriptions = {
    uniqueConstraintFailed?: string; // ? = pole opcjonalne
};

export type TPrismaErrorResponse = {
    status: number;
    message: string;
};

const getPrismaErrorResponse = (msg?: string): TPrismaErrorResponse => {
    return {
        status: StatusCodes.BAD_REQUEST,
        message: msg ?? ReasonPhrases.BAD_REQUEST,
    };
};

export const checkPrismaError = (
    err: unknown,
    message?: TPrismaErrorDescriptions,
): TPrismaErrorResponse => {
    const response = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    };
    if (err instanceof PrismaClientKnownRequestError) {
        const code = err.code;

        // DODAĆ INNE KODY W RAZIE POTRZEBY
        switch (code) {
            case 'P2002':
                return getPrismaErrorResponse(message?.uniqueConstraintFailed);
            case 'P2003':
                return getPrismaErrorResponse('Foreign key');
        }
    }
    return response;
};
