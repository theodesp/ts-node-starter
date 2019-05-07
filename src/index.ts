import { createServer } from '@marblejs/core';
import {merge} from 'rxjs';
import httpListener from './app';
import db from './core/db';
import {listening$} from './core/events';
import {env} from './core/settings';

export const index = createServer({
    port: env.SERVER_PORT,
    hostname: env.SERVER_HOST,
    httpListener,
    event$: (...args) => merge(
        listening$(...args),
    ),
});

const bootstrap = async () => {
    await db.users.create();
    await db.users.init();
    db.users.findByName('Demo User 1').then(u => {
        console.log(u);
    });
    await db.users.drop();
    index.run();
};

bootstrap();
