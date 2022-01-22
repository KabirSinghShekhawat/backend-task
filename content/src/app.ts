import express from 'express';
import 'express-async-errors';

import { errorHandler, NotFoundError } from '@uni-cron/pratilipi-common';
import { contentRouter } from './routes/content';
import {ingestionRouter} from './routes/ingestion';
import { eventRouter } from './routes/events';

const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.use('/api/content/', contentRouter);
app.use('/api/content/ingest', ingestionRouter);
app.use('/events', eventRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler)

export { app };
