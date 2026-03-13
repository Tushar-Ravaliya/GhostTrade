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

async function getLowerMarketData(){
  const data=await smartApi.gainersLosers({
    
    "datatype":"PercPriceLosers", 
    "expirytype":"NEAR" 

  })

  return data
}
async function getGainerMarketData(){
  const data=await smartApi.gainersLosers({
    
    "datatype":"PercPriceGainers", 
    "expirytype":"NEAR" 

  })

  return data
}

export { loginAngel, getSession, getLTP,getLowerMarketData,getGainerMarketData };
