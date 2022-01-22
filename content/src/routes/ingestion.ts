import express from "express";
import { upload } from "../middlewares/csvUpload";
import * as ingestionController from "../controllers/ingestion.controller";

const router = express.Router();

router.
    route("/")
    .post(
        upload.single('content'),
        ingestionController.uploadCSV
    );

export { router as ingestionRouter };
