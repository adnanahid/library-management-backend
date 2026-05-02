import { HydratedDocument } from 'mongoose';
import Borrow, { IBorrow } from './borrow.model.js';
import { TcreateBorrow } from './borrow.validation.js';
import Book from '../books/book.model.js';

export const createBorrow = async (payload: TcreateBorrow): Promise<HydratedDocument<IBorrow>> => {
  await Book.borrowBook(payload.book, payload.quantity);
  const result = await Borrow.create(payload);
  return result;
};

export const getAllBorrows = async (): Promise<HydratedDocument<IBorrow>[]> => {
  const result = await Borrow.aggregate([
    {
      $group: { _id: '$book', totalQuantity: { $sum: '$quantity' } },
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: '_id',
        as: 'book',
      },
    },
    { $unwind: '$book' },
    {
      $project: {
        _id: 0,
        book: {
          title: 1,
          isbn: 1,
        },
        totalQuantity: 1,
      },
    },
  ]);
  return result;
};
