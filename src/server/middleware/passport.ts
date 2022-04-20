import { Request, Response, NextFunction } from 'express';
import { NativeError } from 'mongoose';
import Users from '../models/User.models';
import passport from 'passport';
import passportLocal from 'passport-local';
import IUser from '../interfaces/user.types';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});

passport.deserializeUser((id, done) => {
    Users.findById(id, (err: NativeError, user: IUser) => {
        if (user !== undefined && user != null) {
            done(err, {
                id: user.id,
                role: user.role
            });
        } else {
            done(err, null);
        }
    });
});

passport.use(new LocalStrategy({ usernameField: 'email' }, (email: string, password: string, done: any) => {
    console.log(`${email} ${password}`);
    Users.findOne({ email: email }, (err: NativeError, user: IUser) => {
        if (err) {
            console.log('err: ', err);
            return done(err);
        }
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        user.comparePassword(password, user.hashPassword, (err: Error, isMatch: boolean) => {
            if (err) {
                console.log('err: ', err);
                return done(err);
            }
            console.log('isMatch: ', isMatch);
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: 'Invalid email or password.' });
        });
    });
}));

export const fetchUserFromToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization || '';
        let user = null;
        if (token) user = await Users.getUserByToken(token.split(' ')[1]);
        if (user) {
            req.context.user = user;
            req.context.user.auth_token = token;
        }

        next();
    } catch (err) {
        return null;
    }
};

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    if (req.context.user) return next();
    res.status(500).redirect('/');
};

export const isAdminUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.context.user)
    if (req.context.user) {
        const user = req.context.user as IUser;
        console.log(user.role)
        if (user.role === 'admin') return next();
    }
    res.status(500).redirect('/');
};
