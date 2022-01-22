import mongoose from 'mongoose';
import axios from 'axios';
import { app } from './app';
import { EventBus } from './events';
import EventService from './services/handleEvent.service';

const start = async () => {
    try {
        const MONGO_URI = 'mongodb://localhost/interaction'
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }

    const PORT = 3001

    
    app.listen(PORT, async () => {
        console.log('User Interaction Service Listening on port ' + PORT);

        const res = await axios
            .get(EventBus)
            .catch(err => console.error(err.message));

        for (let event of res?.data) {
            console.log('Processing event:', event.type);
            EventService(event)
        }
    });
};

start();