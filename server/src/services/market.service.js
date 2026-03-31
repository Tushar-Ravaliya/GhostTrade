import twelveDataClient from '../config/twelvedata.config.js';

// Default watchlist — free tier supports up to 8 symbols per request
const WATCHLIST = 'TSLA,NVDA,MSFT,AMZN,META,GOOGL';

/**
 * Fetch time-series (daily close) for a single symbol.
 * Returns the raw TwelveData response body.
 */
export const getTimeSeries = async (symbol, interval = '1day', outputsize = 30) => {
  const { data } = await twelveDataClient.get('/time_series', {
    params: { symbol, interval, outputsize },
  });

  if (data.status === 'error') {
    const err = new Error(data.message || 'TwelveData API error');
    err.statusCode = 400;
    throw err;
  }

  return data;
};

/**
 * Fetch quotes for the watchlist, sort by percent_change,
 * and return the top 3 gainers and bottom 3 losers.
 */
export const getMarketMovers = async () => {
  const { data } = await twelveDataClient.get('/quote', {
    params: { symbol: WATCHLIST },
  });

  if (data.status === 'error') {
    const err = new Error(data.message || 'TwelveData API error');
    err.statusCode = 400;
    throw err;
  }

  // TwelveData returns an object keyed by symbol when multiple symbols are requested
  const stocksArray = Object.values(data);

  const sorted = stocksArray.sort(
    (a, b) => parseFloat(b.percent_change) - parseFloat(a.percent_change),
  );

  const gainers = sorted.slice(0, 3);
  const losers = sorted.slice(-3).reverse(); // worst loser first

  return { gainers, losers };
};
