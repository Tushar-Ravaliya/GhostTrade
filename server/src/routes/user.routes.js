import { Router } from 'express';
import { getMe, updateProfile, uploadPhoto, changePassword } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import upload from '../config/multer.config.js';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/me', getMe);
router.put('/update-profile', updateProfile);
router.put('/upload-photo', upload.single('profilePhoto'), uploadPhoto);
router.put('/change-password', changePassword);

export default router;
