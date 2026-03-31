import axios from 'axios';
import config from './config.js';

const twelveDataClient = axios.create({
  baseURL: 'https://api.twelvedata.com',
  params: {
    apikey: config.twelveDataApiKey,
  },
});

export default twelveDataClient;
