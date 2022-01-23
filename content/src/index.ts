import axios from 'axios';
import mongoose from 'mongoose';

import { app } from './app';
import { EventBus } from './events';
import EventService from './services/handleEvent.service';

const start = async () => {
    try {
        let MONGO_URI = process.env?.MONGO_URI;

        if (!MONGO_URI) MONGO_URI = 'mongodb://localhost/content';

        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB at ', MONGO_URI);
    } catch (err) {
        console.error(err);
    }

    const PORT = 3000;

    app.listen(PORT, async () => {
        console.log('Content Service Listening on port ' + PORT);

        const res = await axios
            .get(EventBus)
            .catch(err => console.error(err.message));

        for (let event of res?.data) {
            console.log('Processing event:', event.type);
            EventService(event);
        }
    });
};

start();