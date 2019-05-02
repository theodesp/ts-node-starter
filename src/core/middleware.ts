import parser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import {Router} from 'express';
import expressValidator from 'express-validator';
import lusca from 'lusca';
import session from 'express-session';
import {SESSION_SECRET} from './settings';

export const handleCors = (router: Router) =>
    router.use(cors({credentials: true, origin: true}));

export const handleValidation = (router: Router) =>
    router.use(expressValidator());

export const handleBodyRequestParsing = (router: Router) => {
    router.use(parser.urlencoded({extended: true}));
    router.use(parser.json());
};

export const handleCompression = (router: Router) => {
    router.use(compression());
};

export const handleSession = (router: Router) => {
    router.use(session({
        resave: true,
        saveUninitialized: true,
        secret: SESSION_SECRET!,
    }));
};

export const handleSecurity = (router: Router) => {
    router.use(lusca({
        csrf: true,
        xssProtection: true,
        xframe: 'SAMEORIGIN',
        nosniff: true,
        referrerPolicy: 'same-origin'
    }));
};

export default [
    handleSession,
    handleValidation,
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleSecurity
];

