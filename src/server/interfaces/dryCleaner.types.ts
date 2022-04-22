import { Document, Types } from 'mongoose';

export default interface IUser extends Document {
    _id: Types.ObjectId
    userId: string
    name: string
    description: string
    gallery: string[]
    createdAt?: Date
    updatedAt?: Date
};