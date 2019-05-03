import {combineRoutes, EffectFactory} from '@marblejs/core';
import { getFileEffect$, notFoundEffect$ } from './common/effects';
import {health$} from './health';

const getFile$ = EffectFactory
    .matchPath('/public/:dir*')
    .matchType('GET')
    .use(getFileEffect$);


const notFound$ = EffectFactory
    .matchPath('*')
    .matchType('*')
    .use(notFoundEffect$);

export const api$ = combineRoutes('/', {
    middlewares: [],
    effects: [health$, getFile$, notFound$],
});
