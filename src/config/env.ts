import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not defined in env');

export const env = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
};
