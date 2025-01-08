import { Router } from 'express';

import { changeRole, login, signup } from '../controllers/auth.controllers.js';
import { checkRole, protectRoute } from '../middlewares/auth.middleware.js';
import { validateUser } from '../middlewares/validateUser.middleware.js';

const router = Router();

router.post('/signup', validateUser, signup);
router.post('/login', login);

router.patch('/update-role', protectRoute, checkRole('admin'), changeRole);

export default router;
