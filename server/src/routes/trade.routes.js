import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  buyStock,
  sellStock,
  getPortfolio,
  getHolding,
  getTransactions,
} from '../controllers/trade.controller.js';

const router = Router();

// All trade routes require authentication
router.use(authMiddleware);

router.post('/buy', buyStock);
router.post('/sell', sellStock);
router.get('/portfolio', getPortfolio);
router.get('/portfolio/:symbol', getHolding);
router.get('/transactions', getTransactions);

export default router;
