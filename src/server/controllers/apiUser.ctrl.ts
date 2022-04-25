import { Request, Response } from 'express';
import logger from '../lib/log';
import IUser from '../interfaces/Users.types';
import DryCleaners from '../models/dryCleaner.models';
import Services from '../models/Service.models';
import Order from '../models/Order.models';
import mongoose from 'mongoose';
import Orders from "../models/Order.models";

class ApiUserCtrl {
    /**
     * @desc create order
     * @route POST /
     * @query { serviceName: string, priceService: number, serviceId: ObjectID | string, userName: string  }
     * @success { newOrder: object }
     * @access Private
     */
    createOrder = async (req: Request, res: Response) => {
        try {
            const user = req.context.user as IUser;
            const newOrder = new Order({ ...req.body, userId: user._id });

            await newOrder.save(async (err) => {
                if (err) {
                    logger.error('err save newOrder: ', err);
                    return res.status(500).send({ error: err });
                }

                return res.status(200).send(newOrder);
            });
        } catch (err) {
            logger.error('err createOrder: ', err);
            return res.status(500).send({ error: err });
        }
    }

    /**
     * @desc get user order
     * @route POST /
     * @query {}
     * @success { userOrders: array }
     * @access Private
     */
    getUserOrder = async (req: Request, res: Response) => {
        try {
            const user = req.context.user as IUser;
            const userOrders = await Orders.find({ userId: user._id });

            return res.status(200).send(userOrders);
        } catch (err) {
            logger.error('err createOrder: ', err);
            return res.status(500).send({ error: err });
        }
    }
}

export default ApiUserCtrl;
