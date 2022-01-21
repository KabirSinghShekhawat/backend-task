import express from "express";



const router = express.Router();

import { BadRequestError } from "@uni-cron/pratilipi-common";
import * as ingestionController from "../controllers/ingestion.controller";
import { upload } from "../middlewares/csvUpload";


router.
    route("/")
    .post(
        upload.single('content'),
        ingestionController.uploadCSV
    );

export { router as ingestionRouter };
