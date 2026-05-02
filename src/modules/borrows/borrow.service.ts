import { HydratedDocument } from 'mongoose';
import Borrow, { IBorrow } from './borrow.model.js';
import { TcreateBorrow } from './borrow.validation.js';
import Book from '../books/book.model.js';

export const createBorrow = async (payload: TcreateBorrow): Promise<HydratedDocument<IBorrow>> => {
  await Book.borrowBook(payload.book, payload.quantity);
  const result = await Borrow.create(payload);
  return result;
};
