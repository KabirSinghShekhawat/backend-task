import express from 'express';
import 'express-async-errors';

import { errorHandler, NotFoundError } from '@uni-cron/pratilipi-common';
import { eventRouter } from './routes/events';
import { interactionRouter } from './routes/interactions';

const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.use('/api/user-interaction', interactionRouter);
app.use('/events', eventRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler)

export { app };
