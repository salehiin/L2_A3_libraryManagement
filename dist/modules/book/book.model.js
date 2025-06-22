"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, trim: true, required: true },
    author: { type: String, trim: true, required: true },
    genre: { type: String, enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'], required: true },
    isbn: { type: String, trim: true, unique: true, required: true },
    description: { type: String, trim: true },
    copies: { type: Number, min: 0, required: true },
    available: { type: Boolean, default: true }
}, { timestamps: true });
const Book = (0, mongoose_1.model)('Book', bookSchema);
exports.default = Book;
