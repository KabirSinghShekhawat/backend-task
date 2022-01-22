import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
    try {
        const MONGO_URI = 'mongodb://localhost/interaction'
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }

    const PORT = 3001
    app.listen(PORT, () => {
        console.log('Content Service Listening on port ' + PORT);
    });
};

start();