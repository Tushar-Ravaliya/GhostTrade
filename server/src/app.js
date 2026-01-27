import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

app.use(
  cors({
    origin: process.env.CORS_ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

import healthCheckRouter from './routes/healthcheck.route.js';
app.use('/api/v1/healthcheck', healthCheckRouter);

app.get('/api/testing', (req, res) => {
  return res.send('success');
});
export default app;
