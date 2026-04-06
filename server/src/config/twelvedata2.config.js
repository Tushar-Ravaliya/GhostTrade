import axios from 'axios';
import config from './config.js';

const twelveDataClient2 = axios.create({
  baseURL: 'https://api.twelvedata.com',
  params: {
    apikey: config.twelveDataApiKey2,
  },
});

export default twelveDataClient2;
