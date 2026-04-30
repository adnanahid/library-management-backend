import BookModel, { IBook } from './book.model.js';
import { TCreateBook } from './book.validation.js';
import { HydratedDocument } from 'mongoose';

export const createBook = async (bookData: TCreateBook): Promise<HydratedDocument<IBook>> => {
  const book = await BookModel.create(bookData);
  return book;
};
