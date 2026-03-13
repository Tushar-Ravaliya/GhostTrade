import pkg from "smartapi-javascript"
import dotenv from "dotenv"

dotenv.config({
  path: './../.env',
});
console.log(pkg);

const {SmartAPI}=pkg
console.log(SmartAPI);

const smartApi=new SmartAPI({
    api_key:process.env.SMART_API_KEY,
})

export default smartApi