import { Router } from 'express';
import axios from 'axios';

const router = Router();
router.get('/api/stocks/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const response = await axios.get(`https://api.twelvedata.com/time_series`, {
      params: {
        symbol: symbol,
        interval: '1day',
        outputsize: '30', // Get last 30 days
        apikey: process.env.TWELVE_DATA_API_KEY,
      },
    });

    if (response.data.status === 'error') {
      return res.status(400).json({ message: response.data.message });
    }

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching stock data' });
  }
});

export default router;
