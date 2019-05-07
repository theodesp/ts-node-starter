import { combineRoutes, EffectFactory } from '@marblejs/core';
import { getUserEffect$, getUserListEffect$ } from './effects';

export const getUserList$ = EffectFactory
    .matchPath('/')
    .matchType('GET')
    .use(getUserListEffect$);

export const getUser$ = EffectFactory
    .matchPath('/:id')
    .matchType('GET')
    .use(getUserEffect$);

export const users$ = combineRoutes('/users', {
    effects: [getUserList$, getUser$],
    middlewares: [],
});
