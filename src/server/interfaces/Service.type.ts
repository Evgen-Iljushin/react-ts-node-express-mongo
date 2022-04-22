import { Document, Types } from 'mongoose';

export default interface IService extends Document {
    _id: Types.ObjectId
    name: string
    cleanerId: string
    price: number
    description: string
    gallery: string[]
    createdAt?: Date
    updatedAt?: Date
};