import { Request, Response } from "express";
import {
    StatusCodes,
    ReasonPhrases
} from 'http-status-codes';
import { createResponse } from "@uni-cron/pratilipi-common";
import EventService from "../services/handleEvent.service";

const eventController = async (
    req: Request,
    res: Response
) => {
    const { type, data } = req.body;

    await EventService({ type, data });

    res.status(StatusCodes.OK)
        .json(
            createResponse(
                {},
                StatusCodes.OK,
                ReasonPhrases.OK
            )
        );
}

export default eventController;