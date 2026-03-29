import app from './app.js';
import connectDb from './db/index.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*', // Adjust this to your frontend URL in production
  },
});
const port = process.env.PORT || 8000;

connectDb()
  .then(async () => {
    httpServer.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('error', err);
    process.exit(1);
  });
