import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.log('❌ MongoDB connection Error', error);
    process.exit(1);
  }
};

export default connectDb;
