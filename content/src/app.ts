import express from 'express';
import 'express-async-errors';

import { errorHandler,NotFoundError } from '@uni-cron/pratilipi-common';
import { contentRouter } from './routes/content';
import {ingestionRouter} from './routes/ingestion';

const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.use('/api/content/', contentRouter);
app.use('/api/content/ingest', contentRouter);


app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler)

export { app };
