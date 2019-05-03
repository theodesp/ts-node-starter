import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
    dotenv.config({path: '.env'});
} else {
    dotenv.config({path: '.env.example'});  // you can delete this after you create your own .env file!
}

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
    process.exit(1);
}

const ENVIRONMENT = process.env.NODE_ENV;
const isProduction = ENVIRONMENT === 'production';
const isTest = ENVIRONMENT === 'test';
export const DB_URI = isProduction ? process.env.DB_URI : process.env.DB_URI_LOCAL;

export interface Environment {
    NODE_ENV?: string,
    SERVER_HOST: string,
    SERVER_PORT: number,
    LOG_LEVEL: string,
    SESSION_SECRET?: string,
    IS_PRODUCTION: boolean,
    IS_TEST: boolean,
    DB_URI?: string
}

export const env: Environment = {
    NODE_ENV: ENVIRONMENT,
    SERVER_HOST: '127.0.0.1',
    SERVER_PORT: 3000,
    LOG_LEVEL: 'dev',
    SESSION_SECRET,
    IS_PRODUCTION: isProduction,
    IS_TEST: isTest,
    DB_URI
};
