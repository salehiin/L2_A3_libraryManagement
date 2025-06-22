import { Request, Response } from 'express';
import Book from './books.model';




const createBook = async (req: Request, res: Response) => {

    try {
        const data = await Book.create(req.body);

        res.send({
            success: true,
            message: 'Book created successfully',
            data
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

const getBooks = async (req: Request, res: Response) => {
    try {
        // const data = await Book.find();
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
        const query: any = {};
        if (filter) {
            query.genre = filter;
        }
        const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(Number(limit));

        res.send({
            success: true,
            message: 'Books retrieved successfully',
            data: books,
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

const getBookById = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const data = await Book.findById(bookId);
        res.send({
            success: true,
            message: 'Book retrieved successfully',
            data,
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

const updateBook = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const data = await Book.findByIdAndUpdate(bookId, req.body, { new: true, runValidators: true });
        res.send({
            success: true,
            message: 'Book updated successfully',
            data,
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


const deleteBookById = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const data = await Book.findByIdAndDelete(bookId);
        res.send({
            success: true,
            message: 'Book deleted successfully',
            data: null,
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

export const bookController = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBookById
};