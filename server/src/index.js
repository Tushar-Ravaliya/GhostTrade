import app from './app.js';
import connectDb from './db/index.js';
import {Server} from 'socket.io'
import {createServer} from 'node:http'
import { loginAngel,initializeRealTimeFeed } from './services/angel.services.js';
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*", // Adjust this to your frontend URL in production
  }
});
const port = process.env.PORT || 8000;

connectDb()
  .then(async () => {
    try {
      await loginAngel();
      await initializeRealTimeFeed((tickData)=>{
        io.emit('market-update', tickData);
      })
    } catch (err) {
      // Login failed on startup (e.g. TOTP window boundary).
      // ensureSession() in angel.services.js will retry on the first API call.
      console.warn('Angel One login failed on startup — will retry on first request:', err.message);
    }
    httpServer.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('error', err);
    process.exit(1);
  });
