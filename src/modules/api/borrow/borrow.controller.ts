import { Request, Response } from 'express';
import Borrow from './borrow.model';
import Book from '../books/books.model';



const createBorrow = async (req: Request, res: Response) => {

    try {
        

        const updatedBook = await Book.checkAndUpdateInventory(
            req.body.book,
            req.body.quantity
        );

        if (!updatedBook) {
            throw new Error('Not enough copies available');
        }

        // ✅ Create borrow record
        const borrow = await Borrow.create(req.body);

        res.send({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        });

    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');

        res.status(400).send({
            message: err.message,
            success: false,
            error: {
                name: err.name,
                message: err.message,
            },
        });
    }

};

const getBorrows = async (req: Request, res: Response) => {
   
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo'
                }
            },
            {
                $unwind: '$bookInfo'
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn'
                    }
                }
            }
        ]);

        res.send({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary
        });

    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        res.status(400).send({
            message: err.message,
            success: false,
            error: {
                name: err.name,
                message: err.message,
            },
        });
    }
};


export const borrowController = {
    createBorrow,
    getBorrows
};