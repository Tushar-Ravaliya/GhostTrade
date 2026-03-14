import app from './app.js';
import connectDb from './db/index.js';
import { loginAngel } from './services/angel.services.js';

const port = process.env.PORT || 8000;

connectDb()
  .then(async () => {
    try {
      await loginAngel();
    } catch (err) {
      // Login failed on startup (e.g. TOTP window boundary).
      // ensureSession() in angel.services.js will retry on the first API call.
      console.warn('Angel One login failed on startup — will retry on first request:', err.message);
    }
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('error', err);
    process.exit(1);
  });
