import { createContext, createServer } from '@marblejs/core';
import {QueryResult} from 'pg';
import httpListener from './app';
import postgres from './core/db'
import {env} from './core/settings'

export const index = createServer({
    port: env.SERVER_PORT,
    hostname: env.SERVER_HOST,
    httpListener,
});

const bootstrap = async () => {
    const result = await postgres.cursor('SELECT NOW()');
    result.read(1, (err: any, res: any) => {
        console.warn(res);
        result.release();
    });

    index.run();
};

bootstrap();
