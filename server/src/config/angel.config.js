import pkg from "smartapi-javascript"
import dotenv from "dotenv"

dotenv.config({
  path: './../.env',
});

const { SmartAPI } = pkg


const smartApi = new SmartAPI({
  api_key: process.env.SMART_API_KEY,
})

export default smartApi