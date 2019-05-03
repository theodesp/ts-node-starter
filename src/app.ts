import {httpListener} from '@marblejs/core';
import {bodyParser$} from '@marblejs/middleware-body';
import {cors$} from '@marblejs/middleware-cors';
import {logger$} from '@marblejs/middleware-logger';
import dotenv from 'dotenv';
import {healthRoute$} from './effects';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({path: '.env.example'});

const middlewares = [
    logger$(),
    bodyParser$(),
    cors$()
];

const effects: any = [
    healthRoute$
];

export default httpListener({middlewares, effects});
