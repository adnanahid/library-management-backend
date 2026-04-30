/* eslint-disable no-console */
import * as bookService from './book.service.js';
import { Request, Response } from 'express';
import { createBookSchema } from './book.validation.js';

export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = createBookSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: parsed.error });
      return;
    }
    const result = await bookService.createBook(parsed.data);
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
