import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
    try {
        const MONGO_URI = 'mongodb://localhost/content'
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Content Service Listening on port 3000');
    });
};

start();