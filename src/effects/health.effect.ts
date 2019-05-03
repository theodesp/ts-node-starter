import {HttpEffect, r} from '@marblejs/core';
import {mapTo} from 'rxjs/operators';

const healthEffect$: HttpEffect = req$ => req$.pipe(
    mapTo({
        body: {
            message: 'Hello, world!'
        }
    }),
);

export const health$ = r.pipe(
    r.matchPath('/'),
    r.matchType('GET'),
    r.useEffect(healthEffect$));
