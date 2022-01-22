import { app } from './app';

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Event Bus Listening on port ' + PORT);
});
