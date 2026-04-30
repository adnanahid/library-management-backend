import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('🟢 MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('🔴 MongoDB connection failed:', error);
    process.exit(1);
  }
};
