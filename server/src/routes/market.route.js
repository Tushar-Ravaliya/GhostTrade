import { Router } from 'express';
import { getTimeSeries, getMarketMovers } from '../controllers/market.controller.js';

const router = Router();

router.get('/timeseries/:symbol', getTimeSeries);
router.get('/market-movers', getMarketMovers);

export default router;
