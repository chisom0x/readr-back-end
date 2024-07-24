import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes/index';

dotenv.config();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],
  optionsSuccessStatus: 200,
};

export const createServer = () => {
  const app = express();

  app.use(cors(corsOptions));
  app.options('*', cors());
  app.use(express.json());

  app.get('/', (req: express.Request, res: express.Response) => {
    res.json({ message: 'Hello World' });
  });

  app.use('/readr', router);

  return app;
};
