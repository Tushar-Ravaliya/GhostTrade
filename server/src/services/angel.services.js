import smartApi from '../config/angel.config.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { authenticator } = require('otplib');
import { WebSocketV2 } from 'smartapi-javascript';

let sessionData = null;

let ws = null;
async function initializeRealTimeFeed(onTickCallback) {
  await ensureSession();

  // Initialize using WebSocketV2
  ws = new WebSocketV2({
    jwttoken: sessionData.jwtToken,
    apikey: process.env.SMART_API_KEY,
    clientcode: process.env.ANGEL_CLIENT_CODE,
    feedtype: sessionData.feedToken,
  });

  ws.connect()
    .then(() => {
      console.log('Available methods:', Object.keys(ws));
    })
    .catch((err) => {
      console.error('❌ Connection failed:', err);
    });

  ws.on('tick', (data) => {
    if (onTickCallback) onTickCallback(data);
  });
}
async function loginAngel() {
  try {
    const totp = authenticator.generate(process.env.ANGEL_TOTP_SECRET);

    const session = await smartApi.generateSession(
      process.env.ANGEL_CLIENT_CODE,
      process.env.ANGEL_PASSWORD,
      totp
    );

    if (!session.data) {
      throw new Error(`generateSession returned no data: ${JSON.stringify(session)}`);
    }

    sessionData = session.data;

    smartApi.setAccessToken(sessionData.jwtToken);

    console.log('Angel One Login Successful');
  } catch (err) {
    console.error('Angel Login Error:', err.message);
    throw err; // rethrow so callers know login failed
  }
}

// Ensures a valid session exists before making any API call.
// If the startup login silently failed (e.g. TOTP window boundary),
// this will retry the login automatically.
async function ensureSession() {
  if (!sessionData) {
    console.log('No active session found, attempting re-login...');
    await loginAngel();
  }
}

function getSession() {
  return sessionData;
}

async function getLTP(exchange, symbol, token) {
  const data = await smartApi.marketData({
    mode: 'LTP',
    exchangeTokens: {
      [exchange]: [token],
    },
  });

  return data;
}

async function getLowerMarketData() {
  await ensureSession();
  const data = await smartApi.gainersLosers({
    datatype: 'PercPriceLosers',
    expirytype: 'NEXT',
  });
  return data;
}

async function getGainerMarketData() {
  await ensureSession();
  const data = await smartApi.gainersLosers({
    datatype: 'PercPriceGainers',
    expirytype: 'NEAR',
  });
  return data;
}
async function getName() {
  const data = await smartApi.searchScrip({
    exchange: 'NSE',
    searchscrip: 'TATACONSUM',
  });

  return data;
}

function subscribeToStocks(tokens, exchangeType = 1) {
  if (!ws) {
    console.error('❌ WebSocket not initialized. Cannot subscribe.');
    return;
  }

  const json_req = {
    correlationId: 'home_page_watch',
    action: 1, // 1 = Subscribe
    mode: 1, // 1 = LTP
    exchangeType: exchangeType, // 1 = NSE
    tokens: tokens.map((t) => String(t)), // Array of strings: ["3045", "99926000"]
  };

  console.log('Sending subscription for:', json_req.tokens);
  ws.fetchData(json_req);
  console.log(`📡 Subscribed to ${tokens.length} stocks for live updates`);
}

export {
  loginAngel,
  getSession,
  getLTP,
  getLowerMarketData,
  getGainerMarketData,
  getName,
  initializeRealTimeFeed,
  subscribeToStocks,
};
