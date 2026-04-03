import { Router } from 'express';
import { getTimeSeries, getMarketMovers, getStockQuote } from '../controllers/market.controller.js';

const router = Router();

router.get('/timeseries/:symbol', getTimeSeries);
router.get('/market-movers', getMarketMovers);
router.get('/quote/:symbol', getStockQuote);

export default router;
