import mongoose from 'mongoose';
import config from '../config/config.js';

const connectDb = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.log('❌ MongoDB connection Error', error);
    process.exit(1);
  }
};

export default connectDb;
