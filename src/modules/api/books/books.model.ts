import { Model, model, Schema } from 'mongoose';
import { IBook } from './books.interface';

export interface IBookModel extends Model<IBook> {
  checkAndUpdateInventory(bookId: string, quantity: number): Promise<IBook | null>;
}


const bookSchema = new Schema<IBook>({
    title: { type: String, trim: true, required: true },
    author: { type: String, trim: true, required: true },
    genre: { type: String, enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'], required: true },
    isbn: { type: String, trim: true, required: true, unique: [true, 'ISBN already exists'] },
    description: { type: String, trim: true },
    copies: { type: Number, min: 0, required: true },
    available: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false 
});

bookSchema.statics.checkAndUpdateInventory = async function (
  bookId: string,
  quantity: number
) {
  const book = await this.findById(bookId);
  if (!book || book.copies < quantity) return null;

  book.copies -= quantity;
  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();
  return book;
};


const Book = model<IBook, IBookModel>('Book', bookSchema);
export default Book;
