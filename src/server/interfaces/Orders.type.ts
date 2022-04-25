import { Document, Types } from 'mongoose';

export default interface IOrders extends Document {
    _id: Types.ObjectId
    serviceName: string
    priceService: number
    serviceId: Types.ObjectId
    userId: Types.ObjectId
    userName: string
    status: string
    createdAt?: Date
    updatedAt?: Date
};