import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import expressValidator from 'express-validator';
import lusca from 'lusca';
import path from 'path';
import {SESSION_SECRET} from './core/settings';
import {healthRouter} from './routes/health';

import session from 'express-session';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({path: '.env.example'});

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET!,
}));
app.use(lusca({
    csrf: true,
    xssProtection: true,
    xframe: 'SAMEORIGIN',
    nosniff: true,
    referrerPolicy: 'same-origin'
}));

app.use(
    express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

app.use('/health', healthRouter);

export default app;
