import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
} else {
    dotenv.config({ path: '.env.example' });  // you can delete this after you create your own .env file!
}

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
    process.exit(1);
}

const ENVIRONMENT = process.env.NODE_ENV;
const isProduction = ENVIRONMENT === 'production';
const isTest = ENVIRONMENT === 'test';

export const env = {
    NODE_ENV: ENVIRONMENT,
    SERVER_HOST: '127.0.0.1',
    SERVER_PORT: 3000,
    LOG_LEVEL: 'dev',
    SESSION_SECRET: SESSION_SECRET,
    IS_PRODUCTION: isProduction,
    IS_TEST: isTest
};
