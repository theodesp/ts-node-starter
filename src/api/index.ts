import {combineRoutes, EffectFactory} from '@marblejs/core';
import { getFileEffect$ } from './common/effects';
import {health$} from './health';

const getFile$ = EffectFactory
    .matchPath('/public/:dir*')
    .matchType('GET')
    .use(getFileEffect$);

export const api$ = combineRoutes('/', {
    middlewares: [],
    effects: [health$, getFile$],
});
