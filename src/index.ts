import { bindTo, createServer } from '@marblejs/core';
import {merge} from 'rxjs';
import httpListener from './app';
import {db} from './core/tokens';
import {listening$} from './core/events';
import {env} from './core/settings'
import {dbToken} from './core/tokens';

export const index = createServer({
    port: env.SERVER_PORT,
    hostname: env.SERVER_HOST,
    httpListener,
    event$: (...args) => merge(
        listening$(...args),
    ),
    dependencies: [
        bindTo(dbToken)(db(env.DB_URI!)),
    ],
});

const bootstrap = async () => {
    index.run();
};

bootstrap();
