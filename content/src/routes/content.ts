import express from "express";

const router = express.Router();

import * as contentController from "../controllers/content.controller";

router
    .route("/")
    .get(contentController.getAllContent)
    .post(contentController.createContent);


router
    .route("/:id")
    .get(contentController.getContent)
    .patch(contentController.editContent)
    .delete(contentController.deleteContent);


export { router as contentRouter };
