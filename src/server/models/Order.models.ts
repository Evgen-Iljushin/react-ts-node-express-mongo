import mongoose, { Schema } from 'mongoose';
import IOrders from '../interfaces/Orders.type';

const Order = new Schema<IOrders>({
    serviceName: {
        type: String
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Services',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    priceService: {
        type: Number,
        required: true
    },
    userName: {
        type: String
    },
    status: {
        type: String,
        enum: ['Новый', 'Готов к выдаче', 'Выполнен', 'Возврат'],
        default: 'Новый'
    },
    createdAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    }
});

Order.pre('save', function (next) {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
const Orders = mongoose.model<IOrders>('Orders', Order);
export default Orders;
