import express from 'express';
import { createBook } from './book.controller.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { createBookSchema } from './book.validation.js';

const router = express.Router();

router.post('/', validateRequest(createBookSchema), createBook);

export default router;
