import {HttpEffect} from '@marblejs/core';
import {mapTo} from 'rxjs/operators';

export const getHealthEffect$: HttpEffect = req$ => req$.pipe(
    mapTo({
        body: {
            message: 'Hello, world!'
        }
    }),
);
