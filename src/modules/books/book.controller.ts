/* eslint-disable no-console */
import * as bookService from './book.service.js';
import { Request, Response } from 'express';

export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await bookService.createBook(req.body);
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
    return;
  }
};
