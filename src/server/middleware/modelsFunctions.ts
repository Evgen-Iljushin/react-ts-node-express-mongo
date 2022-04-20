import jwt from 'jsonwebtoken';
import { Types, NativeError } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

export const generateJWT = (userId: Types.ObjectId, expiresIn: string): string => {
    const SESSION_SECRET = process.env.SESSION_SECRET;

    return jwt.sign({ _id: userId }, SESSION_SECRET, { algorithm: 'HS256', expiresIn: `${expiresIn}d` });
};

export const decodeJWT = async (token: string): Promise<string | jwt.JwtPayload | null> => {
    const SESSION_SECRET = process.env.SESSION_SECRET;

    try {
        const decoded = await jwt.verify(token, SESSION_SECRET, { complete: false });
        return decoded;
    } catch (err) {
        // err
        console.log('err: ', err);
        return null;
    }
};

export type comparePasswordFunction = (candidatePassword: string, hashPassword: string, cb: (err: any, isMatch: any) => void) => void;

export const comparePassword: comparePasswordFunction = (candidatePassword, hashPassword, cb) => {
    bcrypt.compare(candidatePassword, hashPassword, (err: NativeError, isMatch: boolean) => {
        cb(err, isMatch);
    });
};
