import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    try {
        let MONGO_URI = process.env?.MONGO_URI;

        if (!MONGO_URI) MONGO_URI = 'mongodb://localhost/user';
        
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB at ', MONGO_URI);
    } catch (err) {
        console.error(err);
    }

    const PORT = 3001;

    app.listen(PORT, () => {
        console.log('Content Service Listening on port ' + PORT);
    });
};

start();