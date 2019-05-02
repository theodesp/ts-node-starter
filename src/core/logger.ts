import winston from 'winston';

const logger = winston.createLogger({
    transports: [
        new (winston.transports.Console)({ level: process.env.NODE_ENV === 'production' ? 'error' : 'debug' }),
        new (winston.transports.File)({ filename: 'debug.log', level: 'debug'}),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.debug('Logging initialized at debug level');
}

process.on('unhandledRejection',  (reason: any, p: Promise<any>) => {
    logger.warn('System level exceptions at, Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

export default logger;
