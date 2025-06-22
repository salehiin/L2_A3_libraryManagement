"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowController = void 0;
const borrow_model_1 = __importDefault(require("./borrow.model"));
const books_model_1 = __importDefault(require("../books/books.model"));
const createBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBook = yield books_model_1.default.checkAndUpdateInventory(req.body.book, req.body.quantity);
        if (!updatedBook) {
            throw new Error('Not enough copies available');
        }
        // ✅ Create borrow record
        const borrow = yield borrow_model_1.default.create(req.body);
        res.send({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        });
    }
    catch (error) {
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
});
const getBorrows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.default.aggregate([
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
    }
    catch (error) {
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
});
exports.borrowController = {
    createBorrow,
    getBorrows
};
