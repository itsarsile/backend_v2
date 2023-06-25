import { NextFunction, Request, Response } from 'express';
import { updateUser } from '../services/user.service';
import { getAddressByUserId } from '../services/address.service';

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const address = await getAddressByUserId(user.id)
    res.status(200).status(200).json({
      status: 'success',
      data: {
        user,
        address
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id;
    const input = req.body;

    const updatedUser = await updateUser(userId, input)

    res.status(200).json({
      status: 'success',
      data: {
        updatedUser,
      }
    })
  } catch (err: any) {
    next(err)
  }
}
