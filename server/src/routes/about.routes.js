import { Router } from 'express';
import { getAbout, updateAbout } from '../controllers/about.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Public — anyone can view about page
router.get('/', getAbout);

// Protected — only authenticated users (admin) can update
router.put('/', authMiddleware, updateAbout);

export default router;
