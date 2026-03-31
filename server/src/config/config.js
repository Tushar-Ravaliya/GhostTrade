import dotenv from "dotenv";

dotenv.config({
    path: '../.env'
});

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
}
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
if (!process.env.CORS_ALLOWED_ORIGINS) {
    throw new Error("CORS_ALLOWED_ORIGINS is not defined");
}
if (!process.env.TWELVE_DATA_API_KEY) {
    throw new Error("TWELVE_DATA_API_KEY is not defined");
}
if (!process.env.TWELVE_DATA_API_KEY2) {
    throw new Error("TWELVE_DATA_API_KEY2 is not defined");
}
if (!process.env.IMAGEKIT_PRIVATE) {
    throw new Error("IMAGEKIT_PRIVATE is not defined");
}
if (!process.env.IMAGEKIT_PUBLIC_KEY) {
    throw new Error("IMAGEKIT_PUBLIC_KEY is not defined");
}
if (!process.env.IMAGEKIT_URL_ENDPOINT) {
    throw new Error("IMAGEKIT_URL_ENDPOINT is not defined");
}

const config = {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    corsAllowedOrigins: process.env.CORS_ALLOWED_ORIGINS.split(","),
    twelveDataApiKey: process.env.TWELVE_DATA_API_KEY,
    twelveDataApiKey2: process.env.TWELVE_DATA_API_KEY2,
    imageKitPrivate: process.env.IMAGEKIT_PRIVATE,
    imageKitPublicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    imageKitUrlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
}

export default config;