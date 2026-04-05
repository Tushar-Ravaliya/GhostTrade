import { Router } from 'express';
import { getTimeSeries, getMarketMovers, getStockQuote, searchSymbol } from '../controllers/market.controller.js';

const router = Router();

router.get('/timeseries/:symbol', getTimeSeries);
router.get('/market-movers', getMarketMovers);
router.get('/quote/:symbol', getStockQuote);
router.get('/search', searchSymbol);

export default router;
