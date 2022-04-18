import mongoose from 'mongoose';
import logger from '../lib/log';

const MONGODB_CONNECTION_STRING = process.env.DB_CONFIG_STRING;

// DB connection
mongoose.connect(MONGODB_CONNECTION_STRING)
    .then(() => logger.info(`Mongo connected: ${MONGODB_CONNECTION_STRING}`))
    .catch((err) => logger.error('Mongo error: ', err));
