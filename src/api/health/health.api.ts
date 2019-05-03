import { combineRoutes, EffectFactory } from '@marblejs/core';
import {getHealthEffect$} from './effects';

const getHealth$ = EffectFactory
    .matchPath('/')
    .matchType('GET')
    .use(getHealthEffect$);

export const health$ = combineRoutes('/health', {
    effects: [getHealth$],
    middlewares: [],
});
