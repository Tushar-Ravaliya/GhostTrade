import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

app.use(
  cors({
    origin: process.env.CORS_ALLOWED_ORIGINS?.split(',') || 'http://localhost:5174',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/api/testing', (req, res) => {
  return console.log('scdd');
});
export default app;
