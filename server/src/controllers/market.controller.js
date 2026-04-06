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

/**
 * GET /quote/:symbol
 */
export const getStockQuote = async (req, res) => {
  try {
    const { symbol } = req.params;
    const data = await marketService.getStockQuote(symbol);
    res.json(data);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message || 'Server error fetching stock quote' });
  }
};

/**
 * GET /search?q=AAPL
 */
export const searchSymbol = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length === 0) {
      return res.json({ data: [] });
    }
    const data = await marketService.searchSymbol(q.trim());
    res.json(data);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message || 'Server error searching symbols' });
  }
};

/**
 * GET /logo/:symbol
 */
export const getStockLogo = async (req, res) => {
  try {
    const { symbol } = req.params;
    const data = await marketService.getStockLogo(symbol);
    // TwelveData returns { symbol, logo }, normalize to { symbol, url }
    res.json({ symbol: data.symbol, url: data.logo || data.url || null });
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message || 'Server error fetching stock logo' });
  }
};
