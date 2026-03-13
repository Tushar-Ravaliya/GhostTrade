import app from './app.js';
import connectDb from './db/index.js';
import { loginAngel } from './services/angel.services.js'

const port = process.env.PORT || 8000;

connectDb()
  .then(async () => {
    await loginAngel(); 
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('error', err);
    process.exit(1);
  });
