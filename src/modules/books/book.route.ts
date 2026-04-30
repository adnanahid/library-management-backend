import express from 'express';
import { createBook } from './book.controller.js';

const router = express.Router();

router.post('/', createBook);
// router.get('/', getAllBooksController);
// router.get('/:id', getBookById);
// router.put('/:id', updateBook);
// router.delete('/:id', deleteBook);

export default router;
