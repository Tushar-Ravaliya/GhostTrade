import { healthCheck } from '../controllers/healthcheck.controller.js';
import { Router } from 'express';

const router = Router();

router.route('/').get(healthCheck);
router.route('/instagram').get(healthCheck);

export default router;
