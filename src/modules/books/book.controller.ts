import { Request, Response } from 'express';

export const getAllBooksController = (req: Request, res: Response) => {
  res.send('Get all books');
};
