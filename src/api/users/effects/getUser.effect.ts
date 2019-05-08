import {neverNullable} from '@api/util/rx.util';
import db from '@core/db';
import {HttpEffect, HttpError, HttpStatus, use} from '@marblejs/core';
import {requestValidator$, t} from '@marblejs/middleware-io';
import {from, of, throwError} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';

const validator$ = requestValidator$({
    params: t.type({
        id: t.string,
    })
});

export const getUserEffect$: HttpEffect = req$ =>
    req$.pipe(
        use(validator$),
        mergeMap(req => of(req.params.id).pipe(
            mergeMap(id => from(db.users.findOne(id))),
            mergeMap(neverNullable),
            map(user => ({body: user})),
            catchError(() => throwError(
                new HttpError('User does not exist', HttpStatus.NOT_FOUND)
            ))
        ))
    );
