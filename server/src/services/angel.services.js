import smartApi from '../config/angel.config.js';
import { generateSecret } from 'otplib';
import dotenv from 'dotenv';


dotenv.config({
  path: './../.env',
});
let sessionData = null;

async function loginAngel() {
  try {
    const totp = generateSecret(process.env.ANGEL_TOTP_SECRET);

    const session = await smartApi.generateSession(
      process.env.ANGEL_CLIENT_CODE,
      process.env.ANGEL_PASSWORD,
      totp
    );

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
  const data = await smartApi.ltpData(exchange, symbol, token);

  return data;
}

export { loginAngel, getSession, getLTP };
