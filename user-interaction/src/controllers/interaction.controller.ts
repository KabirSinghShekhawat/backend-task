import axios from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EventBus } from '../events';
import { Interaction } from '../models/interactions';
import { User } from '../models/users';
import { BadRequestError, createResponse } from '@uni-cron/pratilipi-common';

const CheckDocumentExists = async (Model: any, id: string, field: string) => {
    const document = await Model.find({ [field]: id });

    if (!document) throw new BadRequestError(field + ' Not Found');
    return document;
}

const getInteractions = async (req: Request, res: Response) => {
    const contentId = req.query.content as string;

    const content = await CheckDocumentExists(Interaction, contentId, 'content');

    res
        .status(StatusCodes.OK)
        .json(
            createResponse(content, StatusCodes.OK)
        );

}

const createEvent = async (req: Request, res: Response) => {
    const { user: userId, content: contentId } = req.body;

    await CheckDocumentExists(User, userId, 'user');
    await CheckDocumentExists(Interaction, contentId, 'content');

    const event = req.query?.event as string;

    const result = await handleInteraction(event, contentId);

    if (result.modifiedCount === 0)
        throw new BadRequestError('Event Failed');

    res
        .status(StatusCodes.OK)
        .json(
            createResponse(result, StatusCodes.OK)
        )
}

async function handleInteraction(event: string, contentId: string) {
    const eventsList = ['read', 'like', 'unlike'];
    let result: any = {};

    if (!eventsList.includes(event)) throw new BadRequestError('No Event Found');

    switch (event) {
        case 'read': {
            result = await Interaction.read(contentId);

            await axios.post(EventBus, {
                type: 'ContentRead',
                data: { _id: contentId }
            })
            break;
        };
        case 'like': {
            result = await Interaction.like(contentId);

            await axios.post(EventBus, {
                type: 'ContentLiked',
                data: { _id: contentId }
            })
            break;
        };
        case 'unlike': {
            result = await Interaction.like(contentId, -1);

            await axios.post(EventBus, {
                type: 'ContentUnLiked',
                data: { _id: contentId }
            })
            break;
        }
    }

    return result;
}

export {
    getInteractions,
    createEvent
}