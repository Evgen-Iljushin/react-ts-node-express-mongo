import { Request, Response } from 'express';
import logger from '../lib/log';
import fs from 'fs';

class ClientCtrl {
    /**
     * @desc Get client files
     * @route POST /
     * @query {}
     * @success index.html
     * @access Public
     */
    getClientData = async (req: Request, res: Response) => {
        try {
            const file = await fs.readFileSync('public/index.html');
            return res.end(file);
        } catch (err) {
            logger.error('err getClientData: ', err);
            return res.status(500).send({ error: err });
        }
    };
}

export default ClientCtrl;
