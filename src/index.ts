import { createContext, createServer } from '@marblejs/core';
import httpListener from './app';
import postgres from './core/db'
import {env} from './core/settings'

export const index = createServer({
    port: env.SERVER_PORT,
    hostname: env.SERVER_HOST,
    httpListener,
});

const bootstrap = async () => {
    const result = await postgres.query('SELECT NOW()');
    console.log(result.rows[0]);
    index.run();
};

bootstrap();
