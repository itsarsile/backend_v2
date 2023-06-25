import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import { RoleEnumType } from '@prisma/client';

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    if (!user) {
      return next(
        new AppError(401, `Session has expired or user doesn't exist`)
      );
    }

    next();
  } catch (err: any) {
    next(err);
  }
};

export const requireUserRole = (role: RoleEnumType) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    console.log(user.role)
    if (user.role !== role) {
      return next(
        new AppError(403, 'Unauthorized')
      )
    }
    next()
  } catch (err: any) {
    next(err)
  }
}