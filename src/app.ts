import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import middleware from './core/middleware';
import {applyMiddleware, applyRoutes} from './core/utils';
import routes from './routes';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({path: '.env.example'});

// Create Express server
const app = express();
applyMiddleware(middleware, app);
applyRoutes(routes, app);

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(
    express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

export default app;
