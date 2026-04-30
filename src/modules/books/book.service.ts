import BookModel, { IBook } from './book.model.js';
import { TCreateBook } from './book.validation.js';
import { HydratedDocument } from 'mongoose';

export const createBook = async (payload: TCreateBook): Promise<HydratedDocument<IBook>> => {
  const book = await BookModel.create(payload);
  return book;
};
