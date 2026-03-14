import smartApi from '../config/angel.config.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { authenticator } = require('otplib');


let sessionData = null;

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
    mode: "LTP",
    exchangeTokens: {
      [exchange]: [token],
    },
  });

  return data;
}


async function getLowerMarketData() {
  await ensureSession();
  const data = await smartApi.gainersLosers({
    "datatype": "PercPriceLosers",
    "expirytype": "NEXT"
  });
  return data;
}

async function getGainerMarketData() {
  await ensureSession();
  const data = await smartApi.gainersLosers({
    "datatype": "PercPriceGainers",
    "expirytype": "NEAR"
  });
  return data;
}
async function getName() {
  const data = await smartApi.searchScrip({
    exchange: "NSE",
    searchscrip: "TATACONSUM"
  })

  return data
}

export { loginAngel, getSession, getLTP, getLowerMarketData, getGainerMarketData, getName };
