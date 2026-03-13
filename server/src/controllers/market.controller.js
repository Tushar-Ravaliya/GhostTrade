import { asyncHandler } from '../utils/async-handler';
import { ApiResponse } from '../utils/api-response';
const getMarketData = async (req, res) => {

  try {

    const data = await angelService.getLTP(
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

export default {getMarketData}