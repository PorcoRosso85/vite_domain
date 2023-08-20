// import express, { Request, Response } from 'express';
// commonjs style
import * as express from 'express';
import { Request, Response } from 'express';
// import { serializedHeadData } from 'infrastructure/database/dao/mocks/datas/headLsifData';

interface serializedHeadData {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  locale: string;
  site_name: string;
  url: string;
}

const serializedHeadData: serializedHeadData = {
  title: 'My Awesome Website',
  description: 'This is a description of my awesome website.',
  keywords: ['awesome', 'website', 'keywords'],
  author: 'John Doe',
  locale: 'en_US',
  site_name: 'MySite',
  url: 'https://www.example.com',
};

const app = express();
const port = 3000;

app.get('/api/data', (req: Request, res: Response) => {
  res.json(serializedHeadData);
});
app.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});
