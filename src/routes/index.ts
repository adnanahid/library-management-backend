import express from 'express';
import bookRouter from '../modules/books/book.route.js';

const router = express.Router();

router.use('/books', bookRouter);

export default router;
