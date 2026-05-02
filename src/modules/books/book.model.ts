import mongoose, { Model, Schema } from 'mongoose';

export interface IBook {
  title: string;
  author: string;
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

interface IBookModel extends Model<IBook> {
  borrowBook(bookId: string, quantity: number): Promise<void>;
}

export interface IQuery {
  filter?: string;
  sortBy?: string;
  sort?: string;
  limit?: string;
}

export const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

bookSchema.pre('save', function () {
  this.available = this.copies > 0;
});

// bookSchema.statics.borrowBook = async function (bookId, quantity): Promise<void> {
//   const updatedBook = await this.findOneAndUpdate(
//     { _id: bookId, copies: { $gte: quantity } },
//     [
//       {
//         $set: {
//           copies: { $subtract: ['$copies', quantity] },
//           available: {
//             $cond: {
//               if: { $eq: [{ $subtract: ['$copies', quantity] }, 0] },
//               then: false,
//               else: true,
//             },
//           },
//         },
//       },
//     ],
//     { new: true },
//   );
//   if (!updatedBook) {
//     throw new Error('Book not found or insufficient copies');
//   }
// };

bookSchema.statics.borrowBook = async function (bookId: string, quantity: number): Promise<void> {
  const book = await this.findById(bookId);
  if (!book) throw new Error('Book not found');
  if (book.copies < quantity) throw new Error('Not enough copies available');
  book.copies -= quantity;
  await book.save();
};

const Book = mongoose.model<IBook, IBookModel>('Book', bookSchema);

export default Book;
