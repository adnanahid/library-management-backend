import BookModel, { IBook, IQuery } from './book.model.js';
import { TCreateBook } from './book.validation.js';
import { HydratedDocument } from 'mongoose';

export const createBook = async (payload: TCreateBook): Promise<HydratedDocument<IBook>> => {
  const book = await BookModel.create(payload);
  return book;
};

export const getAllBooks = async (query: IQuery): Promise<HydratedDocument<IBook>[]> => {
  const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = query;
  const filterObj = filter ? { genre: filter as IBook['genre'] } : {};
  const books = await BookModel.find(filterObj)
    .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
    .limit(Number(limit));
  return books;
};

export const getBookById = async (bookId: string): Promise<HydratedDocument<IBook> | null> => {
  const result = await BookModel.findById(bookId);
  return result;
};
