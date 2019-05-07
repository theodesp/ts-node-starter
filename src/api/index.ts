import {combineRoutes, EffectFactory} from '@marblejs/core';
import {auth$} from './auth';
import {getFileEffect$, notFoundEffect$, preflightEffect$, versionEffect$} from './common/effects';
import {health$} from './health';
import {users$} from './users';

const root$ = EffectFactory
    .matchPath('/')
    .matchType('GET')
    .use(versionEffect$);

const getFile$ = EffectFactory
    .matchPath('/public/:dir*')
    .matchType('GET')
    .use(getFileEffect$);

const preflight$ = EffectFactory
    .matchPath('*')
    .matchType('OPTIONS')
    .use(preflightEffect$);

const notFound$ = EffectFactory
    .matchPath('*')
    .matchType('*')
    .use(notFoundEffect$);

export const api$ = combineRoutes('/', {
    middlewares: [],
    effects: [root$, health$, users$, auth$, getFile$, preflight$, notFound$],
});
