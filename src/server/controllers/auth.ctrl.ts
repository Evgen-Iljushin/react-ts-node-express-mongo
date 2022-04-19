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
    login = async (req: Request, res: Response) => {
        try {
            return res.status(200).send({
                user: {
                    phone: '111',
                    email: 'qweqwe',
                    firstname: '123123',
                    lastname: '123123123',
                    roles: 'user'
                },
                accessToken: 'accessTokenaccessTokenaccessToken'
            });
        } catch (err) {
            logger.error('err testApi: ', err);
            return res.status(500).send({ error: err });
        }
    }

    register = async (req: Request, res: Response) => {
        try {
            console.log('req.body: ', req.body);
            return res.status(200).send({
                user: {
                    phone: '111',
                    email: 'qweqwe',
                    firstname: '123123',
                    lastname: '123123123',
                    roles: 'user'
                },
                accessToken: 'accessTokenaccessTokenaccessToken'
            });
        } catch (err) {
            logger.error('err testApi: ', err);
            return res.status(500).send({ error: err });
        }
    }
}

export default ApiCtrl;
