import { model, Schema } from 'mongoose';
import { IBorrow, IBorrowModel } from './borrow.interface';
import Book from '../books/books.model';


const borrowSchema = new Schema<IBorrow, IBorrowModel>({
    book: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, min: 0, required: true },
    dueDate: { type: Date, required: true }
}, { 
    timestamps: true,
    versionKey: false 
 });


borrowSchema.static('checkInventory', async function checkInventory(id, quantity) {


    const item = await Book.findById(id);
    if (!item) throw new Error('Book not found');

    if (item.copies < quantity) {
        throw new Error('Book unavailable');
    }
    return true;

});


const Borrow = model<IBorrow, IBorrowModel>('Borrow', borrowSchema);
export default Borrow;

