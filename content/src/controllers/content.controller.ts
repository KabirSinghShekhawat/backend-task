import { createResponse } from "@uni-cron/pratilipi-common";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Content } from "../models/content";
import * as CRUD_Service from "../services/CRUD.service";

const filter = [
    "title",
    "story",
    "date_published",
    "user",
    "interactions",
    "reads",
    "likes"
];

const getContent = CRUD_Service.getOne(Content);

const getAllContent = CRUD_Service.getMany(Content);

const createContent = CRUD_Service.createOne(Content, filter);

const editContent = CRUD_Service.updateOne(Content, filter);

const deleteContent = CRUD_Service.deleteOne(Content);

const getTopContent = async (req: Request, res: Response) => {
    const result = await Content.find({}).sort({ "interactions.total": -1 });
    res
        .status(StatusCodes.OK)
        .json(
            createResponse(result, StatusCodes.OK)
        )
}


export {
    getContent,
    getAllContent,
    getTopContent,
    createContent,
    editContent,
    deleteContent
};
