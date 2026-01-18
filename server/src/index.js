import dotenv from 'dotenv';
import app from './app.js';
import connectDb from './db/index.js';
dotenv.config({
  path: './.env',
});

const port = process.env.PORT || 8000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('error', err);
    process.exit(1);
  });
