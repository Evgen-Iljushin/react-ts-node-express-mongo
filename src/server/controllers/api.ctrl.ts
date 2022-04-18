import { Request, Response } from 'express';
import logger from '../lib/log';

class ApiCtrl {
    /**
     * @desc Get client files
     * @route POST /
     * @query {}
     * @success index.html
     * @access Public
     */
    testApi = async (req: Request, res: Response) => {
        try {
            return res.status(200).send('test api');
        } catch (err) {
            logger.error('err testApi: ', err);
            return res.status(500).send({ error: err });
        }
    }
}

export default ApiCtrl;
