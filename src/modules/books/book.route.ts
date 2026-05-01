import express from 'express';
import { createBook, getAllBooks } from './book.controller.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { createBookSchema } from './book.validation.js';

const router = express.Router();

router.post('/', validateRequest(createBookSchema), createBook);
router.get('/', getAllBooks);

export default router;
