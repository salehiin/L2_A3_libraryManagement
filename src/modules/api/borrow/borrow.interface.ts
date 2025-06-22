import { Model, Types } from 'mongoose';

export interface IBorrow{
    book: Types.ObjectId;
    quantity: number;
    dueDate: Date;
}


export interface IBorrowModel extends Model<IBorrow, {}> {
    // static method
    checkInventory(id: string, quantity: number): Promise<any>;
}