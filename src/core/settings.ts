import dotenv from 'dotenv';
import fs from 'fs';
import logger from './logger';

if (fs.existsSync('.env')) {
    logger.debug('Using .env file to supply config environment variables');
    dotenv.config({ path: '.env' });
} else {
    logger.debug('Using .env.example file to supply config environment variables');
    dotenv.config({ path: '.env.example' });  // you can delete this after you create your own .env file!
}

export const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
    logger.error('No client secret. Set SESSION_SECRET environment variable.');
    process.exit(1);
}

export const ENVIRONMENT = process.env.NODE_ENV;
export const isProduction = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'
