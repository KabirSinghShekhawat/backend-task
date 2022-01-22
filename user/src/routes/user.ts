import express from 'express';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.editUser)
    .delete(userController.deleteUser);

export { router as userRouter }