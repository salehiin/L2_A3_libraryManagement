import { Router } from 'express';
import bookRoute from '../books/books.route';
import borrowRoute from '../borrow/borrow.route';


const routes = Router();

routes.use('/api/books', bookRoute);
routes.use('/api/borrow', borrowRoute);

export default routes;