import express from 'express';
import 'express-async-errors';

import { errorHandler, NotFoundError } from '@uni-cron/pratilipi-common';
import { userRouter } from './routes/user';

const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.use('/api/user/', userRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler)

export { app };
