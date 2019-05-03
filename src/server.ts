import { createServer, createContext, combineMiddlewares } from '@marblejs/core';
import httpListener from './app';
import {env} from './core/settings'

const httpServer = httpListener
    .run(createContext());

export const server = createServer({
    port: env.SERVER_PORT,
    hostname: env.SERVER_HOST,
    httpListener,
});

server.run();
