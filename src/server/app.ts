/* eslint-disable import/first */
require('dotenv').config();
// library import
import express from 'express';
import logger from './lib/log';
import bodyParser from 'body-parser';
import httpContext from 'express-http-context';
import cors from 'cors';
import './lib/db';
import path from 'path';

// routers import
import clientRoute from './routes/client.route';
import apiRoute from './routes/api.route';
import authRoute from './routes/auth.route';

const app = express();

// Cors settings
app.use(cors());

app.use(bodyParser.json());
app.use(httpContext.middleware);
app.use(express.static(path.join(__dirname, '../../public')));
const port = process.env.PORT;

// Routes
app.use('/api', apiRoute);
app.use('/auth', authRoute);
app.use('*', clientRoute);

app.listen(port, () => {
    logger.info(`app start on port ${port}`);
});
