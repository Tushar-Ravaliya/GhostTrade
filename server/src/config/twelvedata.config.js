import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({
  path: './../.env',
});

const twelveDataClient = axios.create({
  baseURL: 'https://api.twelvedata.com',
  params: {
    apikey: process.env.TWELVE_DATA_API_KEY,
  },
});

export default twelveDataClient;
