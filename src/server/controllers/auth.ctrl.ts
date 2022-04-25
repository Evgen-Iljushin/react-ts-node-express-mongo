import { NextFunction, Request, Response } from 'express';
import logger from '../lib/log';
import passport from 'passport';
import IUser from '../interfaces/Users.types';
import { NativeError } from 'mongoose';
import Users from '../models/User.models';
import '../middleware/passport';

class ApiCtrl {
    /**
     * @desc login user
     * @route POST /
     * @query { email, password }
     * @success { user, accessToken }
     * @access private
     */
    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            passport.authenticate('local', async (err: Error, user: IUser) => {
                if (err || !user) {
                    logger.error('ERR login user: ' + err);
                    res.status(500).send({ message: 'err passport auth' });
                    return;
                }

                const token = await user.generateJWT(user._id, 14);
                res.setHeader('Authorization', token);

                return res.status(200).send({
                    user: user,
                    accessToken: token
                });
            })(req, res, next);
        } catch (err) {
            logger.error('err testApi: ', err);
            return res.status(500).send({ error: err });
        }
    }

    /**
     * @desc register user
     * @route POST /
     * @query { email, password, role }
     * @success { user, accessToken }
     * @access private
     */
    register = async (req: Request, res: Response) => {
        try {
            const user = new Users({
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            });

            Users.findOne({ email: req.body.email }, async (err: NativeError, existingUser: IUser) => {
                if (err) {
                    logger.error('ERR register user: ' + err);
                    return res.status(500).send({ message: err });
                }
                if (existingUser) {
                    logger.error('ERR: Account with that email address already exists');
                    return res.status(401).send({ message: 'Account with that email address already exists' });
                }
                user.save(async (err) => {
                    if (err) {
                        logger.error(err.toString());
                        return res.status(500).send({ message: err });
                    }
                    const token = await user.generateJWT(user._id, 14);
                    res.setHeader('Authorization', token);

                    res.status(200).send({
                        type: 'success',
                        data: { user: user, accessToken: token }
                    });
                });
            });
        } catch (err) {
            logger.error('err testApi: ', err);
            return res.status(500).send({ error: err });
        }
    }

    /**
     * @desc check auth user
     * @route POST /
     * @query {}
     * @success { user }
     * @access private
     */
    checkUserAuth = async (req: Request, res: Response) => {
        try {
            const user = req.context.user as IUser;
            if (user) {
                return res.status(200).send({
                    user: {
                        _id: user._id,
                        email: user.email,
                        role: user.role
                    }
                });
            }
            return res.status(500).send({ message: 'user not auth' });
        } catch (e) {
            logger.error('ERR checkUserAuth: ', e);
            return res.status(500).send({ message: 'err check user auth: ' + e });
        }
    }

    /**
     * @desc change user password
     * @route POST /
     * @query { newPassword }
     * @success { resultUpdate }
     * @access public
     */
    restorePassword = async (req: Request, res: Response) => {
        try {
            const user = await Users.findOne({ email: req.body.restoreEmail });
            await user.updatePassword(req.body.newPassword, res);
        } catch (e) {
            logger.error('ERR checkUserAuth: ', e);
            return res.status(500).send({ message: 'err check user auth: ' + e });
        }
    }
}

export default ApiCtrl;
