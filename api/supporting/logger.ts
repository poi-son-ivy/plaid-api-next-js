import pino, { Logger } from 'pino';

// Configuration options for the logger
const loggerOptions: pino.LoggerOptions = {
    // Choose the desired log level (e.g., 'info', 'debug', 'error', etc.)
    level: process.env.LOG_LEVEL || 'info',
    // You can customize other options as needed.
};

// Create a Pino logger instance with the specified options
const logger: Logger = pino(loggerOptions);

export default logger;
