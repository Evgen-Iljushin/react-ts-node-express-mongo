import multer from 'multer';
import { uuid } from 'uuidv4';
import logger from "../lib/log";
import { Request, Response } from 'express';

const DIR = './public/files/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid() + '-' + fileName);
    }
});

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log('file.filename: ', file);
        if ((file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') && file.filename !== 'stringifyData') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

export const uploadFiles = async (req: Request, res: Response) => {
    try {
        console.log('uploadFiles: ', req.files);
        return res.status(200).send(req.files);
    } catch (err) {
        logger.error('err createDryCleaner: ', err);
        return res.status(500).send({ error: err });
    }
}
