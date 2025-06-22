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
const createBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const checkInventory = yield borrow_model_1.default.checkInventory(req.body.book, req.body.quantity);
    if (!checkInventory)
        throw new Error('Book not available');
    const borrow = yield borrow_model_1.default.create(req.body);
    res.send({
        success: true,
        message: 'Book borrowed successfully',
        data: borrow
    });
});
const getBorrows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const borrow = yield borrow_model_1.default.find();
    res.send({
        success: true,
        message: 'Borrowed books summary retrieved successfully',
        data: borrow
    });
});
exports.borrowController = {
    createBorrow,
    getBorrows
};
