import { User } from "../models/user";
import * as CRUD_Service from "../services/CRUD.service";

const filter = [
    "first_name",
    "last_name",
    "email_id",
    "phone_number"
];

const getUser = CRUD_Service.getOne(User);

const getAllUsers = CRUD_Service.getMany(User);

const createUser = CRUD_Service.createOne(User, filter);

const editUser = CRUD_Service.updateOne(User, filter);

const deleteUser = CRUD_Service.deleteOne(User);


export {
    getUser,
    getAllUsers,
    createUser,
    editUser,
    deleteUser
};
