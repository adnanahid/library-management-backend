import { Router } from 'express';
import { createBorrow, getAllBorrows } from './borrow.controller.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { borrowBookSchema } from './borrow.validation.js';

const router = Router();

router.post('/', validateRequest(borrowBookSchema), createBorrow);
router.get('/', getAllBorrows);

export default router;
