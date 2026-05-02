import { Router } from 'express';
import { createBorrow, getAllBorrows } from './borrow.controller.js';

const router = Router();

router.post('/', createBorrow);
router.get('/', getAllBorrows);

export default router;
