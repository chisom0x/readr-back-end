import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index';

dotenv.config();

const corsOptions = {
  origin: true, // Allow access from any address
  optionsSuccessStatus: 200,
};

export const createServer = () => {
  const app = express();

  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions)); // Ensure OPTIONS requests are also allowed
  app.use(express.json());
  app.use(cookieParser());

  app.get('/', (req: express.Request, res: express.Response) => {
    res.json({ message: 'Hello World' });
  });

  app.use('/readr', router);

  return app;
};
