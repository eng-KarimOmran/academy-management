import { NextFunction, Response } from 'express';
import { RequestAuth } from '../auth/auth.type';
import ApiError from '../../shared/utils/ApiError';

export const isAdmin = (req: RequestAuth, res: Response, next: NextFunction) => {
    const isAdmin = req.userLogin?.isAdmin

    if (!isAdmin) throw ApiError.Forbidden()

    return next()
}