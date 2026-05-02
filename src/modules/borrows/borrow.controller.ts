import { Request, Response, NextFunction } from 'express';
import * as borrowService from './borrow.service.js';

export const createBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await borrowService.createBorrow(req.body);
    res.status(201).json({
      success: true,
      message: 'Borrow created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
