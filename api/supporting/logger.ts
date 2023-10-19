import pino, { Logger } from 'pino';

const loggerOptions: pino.LoggerOptions = {
    // Choose the desired log level (e.g., 'info', 'debug', 'error', etc.)
    level: process.env.LOG_LEVEL || 'info',
};

const logger: Logger = pino(loggerOptions);

export default logger;
