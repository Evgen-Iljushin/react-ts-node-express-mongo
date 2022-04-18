import log4js from 'log4js';

// config logger
const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL || 'error';
export default logger;
