import app from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';

const startServer = async (): Promise<void> => {
  await connectDb();

  app.listen(env.PORT, () => {
    console.log(`🚀 Server is running on port ${env.PORT}`);
  });
};

startServer();
