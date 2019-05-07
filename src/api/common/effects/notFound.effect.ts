import { HttpEffect, HttpError, HttpStatus } from '@marblejs/core';
import { throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const notFoundEffect$: HttpEffect = req$ =>
    req$.pipe(switchMap(() =>
        throwError(new HttpError('Route not found', HttpStatus.NOT_FOUND))
    ));
