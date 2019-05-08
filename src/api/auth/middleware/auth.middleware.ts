import { Payload } from '@api/auth';
import { neverNullable } from '@api/util/rx.util';
import {env} from '@core/settings';
import { authorize$ as jwt$, VerifyOptions } from '@marblejs/middleware-jwt';
import { from } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import db from '../../../core/db';

const jwtConfig: VerifyOptions = ({ secret: env.SESSION_SECRET! });

export const verifyPayload$ = (payload: Payload) =>
    from(db.users.findOne(payload._id))
        .pipe(flatMap(neverNullable));

export const authorize$ = jwt$(jwtConfig, verifyPayload$);
