import { Request, Response } from 'express';
import logger from '../lib/log';
import IUser from '../interfaces/Users.types';
import DryCleaners from '../models/dryCleaner.models';
import Services from '../models/Service.models';
import mongoose from 'mongoose';
import Orders from "../models/Order.models";

class ApiAdminCtrl {
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

    /**
     * @desc Create dry cleaner
     * @route POST /
     * @query { name, description, imageList }
     * @success { newDryCleaner }
     * @access Private, admin
     */
    createDryCleaner = async (req: Request, res: Response) => {
        try {
            const user = req.context.user as IUser;

            const files = [];

            if (req.body.files.length > 0) {
                req.body.files.forEach(file => {
                    files.push(file.path.replace(/\\\\/g, '/'));
                });
            }

            const cleaner = new DryCleaners({
                name: req.body.name,
                userId: user._id,
                description: req.body.description,
                gallery: files
            });

            await cleaner.save(async (err) => {
                if (err) {
                    logger.error('err save cleaner: ', err);
                    return res.status(500).send({ error: err });
                }

                return res.status(200).send(cleaner);
            });
        } catch (err) {
            logger.error('err createDryCleaner: ', err);
            return res.status(500).send({ error: err });
        }
    }

    /**
     * @desc get all cleaner
     * @route POST /
     * @query {  }
     * @success { allCleaners }
     * @access Public
     */
    getAllCleaners = async (req: Request, res: Response) => {
        try {
            const allCleaners = await DryCleaners.find();
            res.status(200).send(allCleaners);
        } catch (err) {
            logger.error('err getAllCleaners: ', err);
            return res.status(500).send({ error: err });
        }
    }

    /**
     * @desc delete cleaner
     * @route DELETE /
     * @query { cleanerId }
     * @success { deleteCleaners }
     * @access Private, admin
     */
    deleteCleaners = async (req: Request, res: Response) => {
        try {
            const objId = new mongoose.Types.ObjectId(req.query.id as string);
            const deleteCleaners = await DryCleaners.findOneAndDelete({ _id: objId });
            if (deleteCleaners) return res.status(200).send(deleteCleaners);
            return res.status(500).send({ message: 'cleaner not find and delete' });
        } catch (err) {
            logger.error('err deleteCleaners: ', err);
            return res.status(500).send({ error: err });
        }
    }

    /**
     * @desc Create services
     * @route POST /
     * @query { name, price, cleanerId, description, imageList }
     * @success { newService }
     * @access Private, admin
     */
    createService = async (req: Request, res: Response) => {
        try {
            const files = [];

            if (req.body.files.length > 0) {
                req.body.files.forEach(file => {
                    files.push(file.path.replace(/\\\\/g, '/'));
                });
            }

            const cleaner = new Services({
                name: req.body.name,
                cleanerId: req.body.cleanerId,
                price: req.body.price,
                description: req.body.description,
                gallery: files
            });

            await cleaner.save(async (err) => {
                if (err) {
                    logger.error('err save service: ', err);
                    return res.status(500).send({ error: err });
                }

                return res.status(200).send(cleaner);
            });
        } catch (err) {
            logger.error('err createService: ', err);
            return res.status(500).send({ error: err });
        }
    }

    /**
     * @desc get services
     * @route POST /
     * @query {  }
     * @success { allServices }
     * @access Public
     */
    getServices = async (req: Request, res: Response) => {
        try {
            let allServices;
            if (req.body.cleanerId && req.body.cleanerId !== '') {
                allServices = await Services.find({ cleanerId: req.body.cleanerId });
            } else {
                allServices = await Services.find();
            }


            res.status(200).send(allServices);
        } catch (err) {
            logger.error('err getServices: ', err);
            return res.status(500).send({ error: err });
        }
    }

    /**
     * @desc delete service
     * @route DELETE /
     * @query { cleanerId }
     * @success { deleteCleaners }
     * @access Private, admin
     */
    deleteServices = async (req: Request, res: Response) => {
        try {
            const objId = new mongoose.Types.ObjectId(req.query.id as string);
            const deleteServices = await Services.findOneAndDelete({ _id: objId });
            if (deleteServices) return res.status(200).send(deleteServices);
            return res.status(500).send({ message: 'service not find and delete' });
        } catch (err) {
            logger.error('err deleteServices: ', err);
            return res.status(500).send({ error: err });
        }
    }

    /**
     * @desc get orders
     * @route POST /
     * @query {}
     * @success { orders: array }
     * @access Private
     */
    getOrders = async (req: Request, res: Response) => {
        try {
            const orders = await Orders.find();
            return res.status(200).send(orders);
        } catch (err) {
            logger.error('err createOrder: ', err);
            return res.status(500).send({ error: err });
        }
    }

    /**
     * @desc update orders
     * @route POST /
     * @query { orderId: string, serviceName: string, priceService: number, serviceId: string, userName: string, status: string  }
     * @success { orders: array }
     * @access Private
     */
    updateOrders = async (req: Request, res: Response) => {
        try {
            const updateOrder = await Orders.findOneAndUpdate({ _id: req.body.orderId }, req.body);
            console.log('updateOrder: ', updateOrder);
            return res.status(200).send(updateOrder);
        } catch (err) {
            logger.error('err createOrder: ', err);
            return res.status(500).send({ error: err });
        }
    }
}

export default ApiAdminCtrl;
