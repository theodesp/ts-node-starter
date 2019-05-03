
import { logger$ as log$ } from '@marblejs/middleware-logger';
import { env } from '../../../core/settings';

export const logger$ = log$({ silent: env.IS_TEST });
