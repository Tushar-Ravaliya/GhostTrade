// import { asyncHandler } from '../utils/async-handler';
// import { ApiResponse } from '../utils/api-response';
import {
  getLTP,
  getLowerMarketData,
  getGainerMarketData,
  getName,
} from '../services/angel.services.js';

const getMarketData = async (req, res) => {
  try {
    const data = await getLTP('NSE', 'RELIANCE', '2885');

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const getLowerData = async (req, res) => {
  await sleep(1000);
  try {
    const data = await getLowerMarketData();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getGainerData = async (req, res) => {
  await sleep(100);
  try {
    const data = await getGainerMarketData();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getNameData = async (req, res) => {
  try {
    const data = await getName();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export { getMarketData, getLowerData, getGainerData, getNameData };
