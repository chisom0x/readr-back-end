import dotenv from 'dotenv';
import express from 'express';
import router from "./routes/index";

dotenv.config();

export const createServer = () => {
  const app = express();
  app.use(express.json());

  app.get('/', (req: express.Request, res: express.Response) => {
    res.json({ message: 'Hello World' });
  });

  app.use("/readr", router)

  return app;
};
