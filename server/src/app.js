import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import market from './routes/market.route.js'
import auth from './routes/auth.routes.js'
import user from './routes/user.routes.js'
import trade from './routes/trade.routes.js'

import config from './config/config.js';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);


app.use('/api/v1/market', market)
app.use('/api/v1/auth', auth)
app.use('/api/v1/user', user)
app.use('/api/v1/trade', trade)

export default app;
