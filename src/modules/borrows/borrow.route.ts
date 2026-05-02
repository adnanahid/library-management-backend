import { Router } from 'express';
import { createBorrow } from './borrow.controller.js';

const router = Router();

router.post('/', createBorrow);
// router.get('/', getAllBorrows);
// router.get('/:borrowId', getBorrowById);
// router.put('/:borrowId', updateBorrowById);
// router.delete('/:borrowId', deleteBorrowById);

export default router;
