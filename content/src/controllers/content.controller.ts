import {Content} from "../models/content";
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


export {
    getContent,
    getAllContent,
    createContent,
    editContent,
    deleteContent
};
