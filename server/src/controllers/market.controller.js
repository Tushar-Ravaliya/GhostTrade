import * as marketService from '../services/market.service.js';

/**
 * GET /timeseries/:symbol
 */
export const getTimeSeries = async (req, res) => {
  try {
    const { symbol } = req.params;
    const data = await marketService.getTimeSeries(symbol);
    res.json(data);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message || 'Server error fetching stock data' });
  }
};

/**
 * GET /market-movers
 */
export const getMarketMovers = async (req, res) => {
  try {
    const data = await marketService.getMarketMovers();
    res.json(data);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message || 'Server error fetching market movers' });
  }
};
