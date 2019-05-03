import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import * as FileHelper from '@marblejs/core/dist/+internal/files';
import { requestValidator$, t } from '@marblejs/middleware-io';
import * as path from 'path';
import {asapScheduler, iif, of, throwError} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

const STATIC_PATH = path.resolve(__dirname, '../../../../dist/public');

const validator$ = requestValidator$({
    params: t.type({
        dir: t.string,
    })
});

export const getFileEffect$: HttpEffect = req$ =>
    req$.pipe(
        use(validator$),
        mergeMap(req => of(req.params.dir, asapScheduler).pipe(
            mergeMap(FileHelper.readFile(STATIC_PATH)),
            map(body => ({ body })),
            catchError(error => iif(
                () => error.code === 'ENOENT',
                throwError(new HttpError(`Asset not found for path: ${req.url}`, HttpStatus.NOT_FOUND)),
                throwError(new HttpError('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)),
            )),
        )),
    );
