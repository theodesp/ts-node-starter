import {combineRoutes} from '@marblejs/core';
import {health$} from './health.effect';

export const healthRoute$ = combineRoutes('/health', {
    middlewares: [],
    effects: [health$],
});
