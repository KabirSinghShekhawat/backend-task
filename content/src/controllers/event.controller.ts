import { Request, Response } from "express";
import { createResponse } from "@uni-cron/pratilipi-common";
import {
    StatusCodes
} from "http-status-codes";
import { Content } from "../models/content";

enum ContentEvents {
    Like = 'ContentLiked',
    UnLike = 'ContentUnLiked',
    Read = 'ContentRead'
}

const DecreaseBy = -1

const eventController = async (req: Request, res: Response) => {
    const { type, data } = req.body;
    let result = {};
    switch (type) {
        case ContentEvents.Like: {
            result = await Content.like(data._id);
            break;
        };
        case ContentEvents.UnLike: {
            result = await Content.like(data._id, DecreaseBy);
            break;
        };
        case ContentEvents.Read: {
            result = await Content.read(data._id);
            break;
        }
    }
    res
        .status(StatusCodes.OK)
        .json(
            createResponse(result, StatusCodes.OK)
        )
}

export default eventController;