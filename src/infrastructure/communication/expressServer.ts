// import express, { Request, Response } from 'express';
// commonjs style
import * as express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
// import * as cors from 'cors';
import { initializeLsifData } from 'application/services/initializeLsifData';
import { LsifDataRepositoryImpl } from 'infrastructure/repositories/lsifDataRepository';

const app = express();
const port = 3000;

// TODO: 本来はDIで注入するべき
const lsifDataRepository = new LsifDataRepositoryImpl();
const initializeLsifDataService = new initializeLsifData(lsifDataRepository);

// 開発用にすべてのエンドポイントを公開
app.use(
  cors({
    origin: 'http://localhost:5173', // クライアントのオリジン
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  }),
);

app.get('/api/dat', async (req: Request, res: Response) => {
  try {
    const processedData = await initializeLsifDataService.processListdata();
    const dto = initializeLsifDataService.generate();
    res.json(dto);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
app.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});
