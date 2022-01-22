import express from "express";
const router = express.Router();

import eventController from '../controllers/event.controller';

router
    .route("/")
    .post(eventController);

export { router as eventRouter };