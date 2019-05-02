import errorHandler = require('errorhandler');
import {Request} from 'express';
import { notify } from 'node-notifier';
import logger from './core/logger';
import {isProduction} from './core/settings';

import app from './app';

const errorNotification = (err: Error, str: string, req: Request) => {
    const title = `Error in ${req.method} ${req.url}`;

    notify({
        message: str,
        title,
    });
};

if (!isProduction) {
    // only use in development
    app.use(errorHandler({log: errorNotification}));
}

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
    logger.info(
        `App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`,
    );
    logger.info('Running... Press CTRL-C to stop\n');
});

export default server;
