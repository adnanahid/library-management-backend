import express from 'express';
import bookRouter from '../modules/books/book.route.js';
import borrowRouter from '../modules/borrows/borrow.route.js';

const router = express.Router();

router.use('/books', bookRouter);
router.use('/borrow', borrowRouter);

export default router;
