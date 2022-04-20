import { Document } from 'mongoose';
import { comparePasswordFunction } from '../middleware/modelsFunctions';

export default interface IUser extends Document {
    _id: string;
    email: string;
    phone: string;
    authToken: string;
    password: string;
    hashPassword: string;
    name: string;
    role: string;
    comparePassword: comparePasswordFunction;
    updatePassword: any;
    getUserByToken: any;
    createdAt?: Date;
    updatedAt?: Date;
    generateJWT: any;
};