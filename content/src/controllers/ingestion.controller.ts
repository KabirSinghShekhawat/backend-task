import { Request, Response } from "express";
import { parse } from "csv-parse";
import { StatusCodes } from "http-status-codes";

import { BadRequestError, createResponse } from "@uni-cron/pratilipi-common";
import { Content, ContentDoc } from "../models/content";


const uploadCSV = async (req: Request, res: Response) => {
    const data = req.file?.buffer || [];
    const records: any = [];
    const parser = parse({ delimiter: ',' });

    if (data.length === 0)
        throw new BadRequestError('no data');

    parser.on('readable', () => {
        let record: string[][];
        while ((record = parser.read()) !== null) {
            records.push(record);
        }
    })

    parser.on('error', (err) => { throw new BadRequestError(err.message) })

    parser.write(req.file?.buffer.toString('utf8'));
    parser.end();

    const [, ...content] = records

    type TContents = {
        insertOne: {
            document: ContentDoc;
        }
    }

    const contents: TContents[] = [];

    content.forEach((ele: string[]) => {
        const newContent = new Content({
            title: ele[0],
            story: ele[1],
            user: ele[2],
            date_published: new Date(ele[3])
        });

        contents.push({
            insertOne: {
                document: newContent
            }
        })
    });

    const result = await Content.bulkWrite(contents)

    res
        .status(StatusCodes.CREATED)
        .json(
            createResponse(result.insertedIds, StatusCodes.CREATED)
        );
}

export {
    uploadCSV
}