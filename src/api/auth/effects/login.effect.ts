import {HttpEffect, HttpError, HttpStatus, use} from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { generateToken } from '@marblejs/middleware-jwt';
import {from, of, throwError} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import db from '../../../core/db';
import {env} from '../../../core/settings';
import {neverNullable} from '../../util/rx.util';
import {generateTokenPayload} from '../helpers';

const loginValidator$ = requestValidator$({
    body: t.type({
        login: t.string,
        password: t.string,
    })
});

export const loginEffect$: HttpEffect = req$ =>
    req$.pipe(
        use(loginValidator$),
        mergeMap(req => of(req).pipe(
            map(r => r.body),
            mergeMap(({login, password}) => from(db.users.findByCredentials(login, password))),
            mergeMap(neverNullable),
            map(generateTokenPayload),
            map(generateToken({ secret: env.SESSION_SECRET! })),
            map(token => ({ body: { token } })),
            catchError(() => throwError(
                new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED)
            )),
        ))
    );
