import { Request, Response, NextFunction } from 'express';
import { APIException } from '../../adapters/helpers/api-exception';

export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction): Response | void => {
  if (error instanceof APIException) {
    return res.status(error.status ?? 500).json({
      message: error.message ?? 'Internal Server Error',
    });
  }
  if (error instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
  next();
};
