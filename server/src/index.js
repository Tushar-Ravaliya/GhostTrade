import app from './app.js';
import connectDb from './db/index.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import config from './config/config.js';

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: config.corsAllowedOrigins,
    credentials: true,
  },
});

connectDb()
  .then(async () => {
    httpServer.listen(config.port, () => {
      console.log(`Example app listening on port http://localhost:${config.port}`);
    });
  })
  .catch((err) => {
    console.log('error', err);
    process.exit(1);
  });
