import express from "express";

const router = express.Router();

import * as contentController from "../controllers/interaction.controller";

router
    .route("/")
    .get(contentController.getInteractions)
    .post(contentController.createEvent);



export { router as interactionRouter };
