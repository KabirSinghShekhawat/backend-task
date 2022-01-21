import multer from "multer";

const csvCheck = (
    req: any,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    if (file.mimetype.includes("csv"))
        return cb(null, true);
    cb(null, false);
}


const upload = multer({ fileFilter: csvCheck });



export {upload}