import mongoose from "mongoose";
import axios from 'axios';
import { Request, Response } from "express";
import { EventBus } from "../events";

import {
    StatusCodes,
    ReasonPhrases
} from "http-status-codes";

import {
    isEmpty,
    isEmptyObject,
    objectFilter,
    createResponse
} from "@uni-cron/pratilipi-common";

import { BadRequestError } from "@uni-cron/pratilipi-common";


const getOne = (Model: mongoose.Model<any>) => async (
    req: Request,
    res: Response
) => {
    const id: string = req.params.id;
    const select = req.query.select;

    if (isEmpty(id)) {
        throw new BadRequestError("No id provided");
    }

    const result = await Model.findById(id).select(select);

    if (!result) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json(
                createResponse(
                    result,
                    StatusCodes.NOT_FOUND,
                    ReasonPhrases.NOT_FOUND
                )
            );
    }

    return res.status(StatusCodes.OK).json(createResponse(result, StatusCodes.OK));
}

const createOne = (Model: mongoose.Model<any>, filter: Array<string>) => async (
    req: Request,
    res: Response
) => {
    objectFilter(req.body, filter);

    if (isEmptyObject(req.body)) {
        throw new BadRequestError("Empty Body");
    }

    const newDocument = new Model(req.body);
    const patient = await newDocument.save();

    let query = Model.findById(patient.id)
    if (req.query?.select) query = query.select(req.query.select)

    const result = await query;

    await axios.post(EventBus, { type: 'PostCreated', data: {_id: result._id}});

    res
        .status(StatusCodes.CREATED)
        .json(
            createResponse(
                result,
                StatusCodes.CREATED,
                ReasonPhrases.CREATED
            )
        );
}

const getMany = (Model: mongoose.Model<any>) => async (
    req: Request,
    res: Response
) => {
    let query = Model.find({})

    if (!req.query) {
        const results = await query
        return res
            .status(StatusCodes.OK)
            .json(createResponse(results, StatusCodes.OK));
    }

    if (req.query.sortBy && req.query.sortOrder) {
        query = query.sort({
            [(req.query.sortBy as string)]: req.query.sortOrder
        })
    }
        
    if (req.query.select) query = query.select(req.query.select)

    const { populate, selectPop } = req.query;
    const limit = parseInt(req.query.limit as string);

    if (populate && selectPop) query = query.populate(populate, selectPop)

    if (!isNaN(limit)) query = query.limit(limit)

    const results = await query
    return res
        .status(StatusCodes.OK)
        .json(createResponse(results, StatusCodes.OK));
}

const updateOne = (Model: mongoose.Model<any>, filter: Array<string>) => async (
    req: Request,
    res: Response
) => {
    const documentID = req.params?.id;
    objectFilter(req.body, filter);

    if (isEmpty(documentID) || isEmptyObject(req.body)) {
        throw new BadRequestError("Missing Info");
    }

    const documentExists = await Model.findById(documentID);

    if (isEmpty(documentExists)) {
        throw new BadRequestError("Document not found");
    }

    let query = Model.findByIdAndUpdate(documentID, req.body, { new: true })

    if (req.query?.select) query = query.select(req.query.select);
    const result = await query;

    if (!result) {
        throw new BadRequestError("Document not updated");
    }

    res
        .status(StatusCodes.CREATED)
        .json(createResponse(result, StatusCodes.CREATED));
}

const deleteOne = (Model: mongoose.Model<any>) => async (
    req: Request,
    res: Response
) => {
    const documentID = req.params.id;

    if (isEmpty(documentID)) {
        throw new BadRequestError("Document id not provided");
    }

    const documentExists = await Model.findById(documentID);

    if (!documentExists) {
        throw new BadRequestError("Document not found");
    }

    const result = await Model.findByIdAndDelete(documentID);

    if (!result) {
        throw new BadRequestError("Document not updated");
    }

    await axios.post(EventBus, {type: 'PostDeleted', data: {_id: documentID}});
    res
        .status(StatusCodes.CREATED)
        .json(
            createResponse(
                { "_id": documentID },
                StatusCodes.CREATED,
                "Successfully removed document"
            )
        )
}

export {
    getOne,
    getMany,
    createOne,
    updateOne,
    deleteOne,
};