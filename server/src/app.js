import express from 'express';
import cors from 'cors';
import healthCheckRouter from './routes/healthcheck.route.js';
import dotenv from 'dotenv';
//import cookieParser from 'cookie-parser';

dotenv.config({
  path: './.env',
});
const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
//app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use('/api/v1/healthcheck', healthCheckRouter);

export default app;
