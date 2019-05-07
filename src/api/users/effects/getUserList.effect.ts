import {HttpEffect} from '@marblejs/core';
import {from} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import db from '../../../core/db';

export const getUserListEffect$: HttpEffect = req$ =>
    req$.pipe(
        flatMap(() => from(db.users.findAll())),
        map(body => ({body})),
    );
