import httpListener from '@app';
import {listening$} from '@core/events';
import {env} from '@core/settings';
import { createServer } from '@marblejs/core';
import {merge} from 'rxjs';

export const index = createServer({
    port: env.SERVER_PORT,
    hostname: env.SERVER_HOST,
    httpListener,
    event$: (...args) => merge(
        listening$(...args),
    ),
});

const bootstrap = async () => {
    index.run();
};

bootstrap();
