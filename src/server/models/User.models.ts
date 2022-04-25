import mongoose, { Schema, NativeError } from 'mongoose';
import IUser from '../interfaces/user.types';
import { generateJWT, decodeJWT, comparePassword } from '../middleware/modelsFunctions';
import bcrypt from 'bcrypt-nodejs';

const user = new Schema<IUser>({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashPassword: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false
    },
    authToken: {
        type: String
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

user.pre('save', function save (next) {
    try {
        const user = this as IUser;
        if (!user.isModified('password')) { return next(); }
        bcrypt.genSalt(10, (err, salt) => {
            if (err) { return next(err); }
            bcrypt.hash(user.password, salt, null, (err: NativeError, hash) => {
                if (err) { return next(err); }
                user.hashPassword = hash;
                user.password = '';
                next();
            });
        });
    } catch (err) {
        console.log('ERR user.pre: ', err);
    }
});

user.methods.updatePassword = async function (newPassword: string, res) {
    try {
        const user = this as IUser;
        await bcrypt.genSalt(10, async (err, salt) => {
            if (err) { return res.status(500).send(err); }
            await bcrypt.hash(newPassword, salt, null, async (err: NativeError, hash) => {
                if (err) { return res.status(500).send(err); }
                user.hashPassword = hash;
                user.password = '';
                const resultSave = await user.save();
                return res.status(200).send(resultSave);
            });
        });
    } catch (err) {
        console.log('ERR updatePassword: ', err);
    }
};

user.methods.comparePassword = comparePassword;

user.methods.generateJWT = async (id, dateExpired) => {
    // @ts-ignore
    const token = await generateJWT(id, dateExpired);
    return token;
};

user.statics.getUserByToken = async function (token: string) {
    try {
        const decodeData: any = await decodeJWT(token);
        if (decodeData) {
            // @ts-ignore
            const decodeUser = await this.findOne({ _id: decodeData._id });
            return decodeUser;
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
    }
};

user.pre('save', function (next) {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
const Users = mongoose.model<IUser>('User', user);
export default Users;
