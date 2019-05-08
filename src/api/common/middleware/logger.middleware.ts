import { env } from '@core/settings';
import { logger$ as log$ } from '@marblejs/middleware-logger';

export const logger$ = log$({ silent: env.IS_TEST });
