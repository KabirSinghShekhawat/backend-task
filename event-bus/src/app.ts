import express from 'express';
import 'express-async-errors';
import axios from 'axios';
import { errorHandler, NotFoundError } from '@uni-cron/pratilipi-common';
import { EventBus } from './events';
const app = express();

app.set('trust proxy', true);
app.use(express.json());

const events: any = [];

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);

    console.log("Event Created:", req.body.type);

    axios
        .post(EventBus.content, event)
        .catch(err => console.error(err.message));

    axios
        .post(EventBus.interactions, event)
        .catch(err => console.error(err.message));

    res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
    res.send(events);
});


app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler)

export { app };
