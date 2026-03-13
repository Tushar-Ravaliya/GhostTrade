// import { asyncHandler } from '../utils/async-handler';
// import { ApiResponse } from '../utils/api-response';
import { getLTP } from '../services/angel.services.js'
const getMarketData = async (req, res) => {

  try {

    const data = await getLTP(
      "NSE",
      "RELIANCE",
      "2885"
    );

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

export { getMarketData }