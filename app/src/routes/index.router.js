import { Router } from 'express';

import authRouter from './auth.router.js';
import productsRouter from './products.router.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productsRouter);

export default router;
