import { Router } from 'express';
import { bookController } from './books.controller';



const bookRoute = Router();

bookRoute.post('/', bookController.createBook);
bookRoute.get('/:bookId', bookController.getBookById);
bookRoute.get('/', bookController.getBooks);
bookRoute.patch('/:bookId', bookController.updateBook);
bookRoute.delete('/:bookId', bookController.deleteBookById);

export default bookRoute;