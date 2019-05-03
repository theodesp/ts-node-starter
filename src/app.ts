import {httpListener} from '@marblejs/core';
import {bodyParser$} from '@marblejs/middleware-body';
import {cors$, logger$} from './api/common/middleware';
import dotenv from 'dotenv';
import {api$} from './api';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({path: '.env.example'});

const middlewares = [
    logger$,
    bodyParser$(),
    cors$
];

const effects: any = [
    api$
];

export default httpListener({middlewares, effects});
