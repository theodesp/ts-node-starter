import { createContext, createServer } from '@marblejs/core';
import httpListener from './app';
import {env} from './core/settings'

export const index = createServer({
    port: env.SERVER_PORT,
    hostname: env.SERVER_HOST,
    httpListener,
});

index.run();
