import mongoose from "mongoose";
import { Request, Response } from "express";
import { createResponse } from "@uni-cron/pratilipi-common";
import {
    StatusCodes
} from "http-status-codes";
import { Interaction } from "../models/interactions";
import { User } from "../models/users";

enum InteractionEvents {
    UserCreated = 'UserCreated',
    UserDeleted = 'UserDeleted',
    PostCreated = 'PostCreated',
    PostDeleted = 'PostDeleted'
}

const eventController = async (req: Request, res: Response) => {
    const { type, data } = req.body;
    let result = {};
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
    res
        .status(StatusCodes.OK)
        .json(
            createResponse(result, StatusCodes.OK)
        )
}

export default eventController;