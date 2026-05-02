import mongoose, { Schema } from 'mongoose';

export interface IBorrow {
  book: mongoose.Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Borrow = mongoose.model<IBorrow>('Borrow', borrowSchema);

export default Borrow;
