import mongoose from "mongoose";
import { Interaction } from "../models/interactions";
import { User } from "../models/users";

enum InteractionEvents {
    UserCreated = 'UserCreated',
    UserDeleted = 'UserDeleted',
    PostCreated = 'PostCreated',
    PostDeleted = 'PostDeleted'
}
type Event = { type: string, data: { _id: string } | any };

const EventService = async (event : Event) => {
    const { type, data } = event;
    console.log("Event:", type);
    
    switch (type) {
        case InteractionEvents.PostCreated: {
            const newInteraction = new Interaction({ content: data._id });
            await newInteraction.save();
            break;
        };
        case InteractionEvents.PostDeleted: {
            await Interaction.deleteOne({ 'post': new mongoose.mongo.ObjectId(data._id) });
            break;
        };
        case InteractionEvents.UserCreated: {
            const newUser = new User({ user: data._id });
            await newUser.save();
            break;
        };
        case InteractionEvents.UserDeleted: {
            await User.deleteOne({ 'user': new mongoose.mongo.ObjectId(data._id) });
            break;
        };
    }
}

export default EventService