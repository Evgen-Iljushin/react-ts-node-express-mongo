import mongoose, { Schema } from 'mongoose';
import IService from '../interfaces/Service.type';

const Service = new Schema<IService>({
    name: {
        type: String,
        required: false
    },
    cleanerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DryCleaners',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    gallery: [{
        type: String
    }],
    createdAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    }
});

Service.pre('save', function (next) {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
const Services = mongoose.model<IService>('Services', Service);
export default Services;
