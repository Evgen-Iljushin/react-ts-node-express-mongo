import mongoose, { Schema } from 'mongoose';
import IDryCleaner from '../interfaces/dryCleaner.types';

const dryCleaner = new Schema<IDryCleaner>({
    name: {
        type: String,
        required: false
    },
    userId: {
        type: String,
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

dryCleaner.pre('save', function (next) {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
const DryCleaners = mongoose.model<IDryCleaner>('DryCleaners', dryCleaner);
export default DryCleaners;
