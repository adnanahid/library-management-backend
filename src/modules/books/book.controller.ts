/* eslint-disable no-console */
import * as bookService from './book.service.js';
import { NextFunction, Request, Response } from 'express';

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await bookService.createBook(req.body);
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
