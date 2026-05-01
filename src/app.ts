import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api', routes);

app.use(globalErrorHandler);

export default app;
