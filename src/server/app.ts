/* eslint-disable import/first */
require('dotenv').config();
// library import
import express from 'express';
import logger from './lib/log';
import bodyParser from 'body-parser';
import httpContext from 'express-http-context';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import './lib/db';
import path from 'path';

// routers import
import clientRoute from './routes/client.route';
import apiAdminRoute from './routes/apiAdmin.route';
import apiUserRoute from './routes/apiUser.route';
import authRoute from './routes/auth.route';

export class Context {
    user: any;
    constructor (public someContextVariable: any) {
        this.user = null;
    }

    log (message: string) {
        console.log(this.someContextVariable, { message });
    }
}

declare global {
    namespace Express {
        interface Request {
            context: Context
        }
    }
}

const app = express();

app.use((req, res, next) => {
    req.context = new Context(req.url);
    next();
});

// Cors settings
app.use(cors());

app.use(httpContext.middleware);
app.use(express.static('public'));
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'a!sh12dfjhas34dlkjf_halkwdsdjhflakw2',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

// files path
app.use('/public/files', express.static('public/files'));

// Routes
app.use('/api', apiAdminRoute);
app.use('/user', apiUserRoute);
app.use('/auth', authRoute);
app.use('*', clientRoute);

app.listen(port, () => {
    logger.info(`app start on port ${port}`);
});
