import {map, tap} from 'rxjs/operators';

import {HttpServerEffect, matchEvent, ServerEvent} from '@marblejs/core';

export const listening$: HttpServerEffect = (event$) =>
    event$.pipe(
        matchEvent(ServerEvent.listening),
        map(event => event.payload),
        tap(({port, host}) => console.log(`Running @ http://${host}:${port}/`)),
    );
