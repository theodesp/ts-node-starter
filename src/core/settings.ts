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
export const DB_URI = ENVIRONMENT === 'production' ? process.env.DB_URI : process.env.DB_URI_LOCAL;

export interface Environment {
    NODE_ENV?: string,
    SERVER_HOST: string,
    SERVER_PORT: number,
    LOG_LEVEL: string,
    SESSION_SECRET?: string,
    IS_PRODUCTION: boolean,
    IS_TEST: boolean,
    IS_DEV: boolean,
    DB_URI?: string
}

export const env: Environment = {
    NODE_ENV: ENVIRONMENT,
    SERVER_HOST: '127.0.0.1',
    SERVER_PORT: 3000,
    LOG_LEVEL: 'dev',
    SESSION_SECRET,
    IS_PRODUCTION: ENVIRONMENT === 'production',
    IS_TEST: ENVIRONMENT === 'test',
    IS_DEV: ENVIRONMENT === 'development',
    DB_URI
};

export interface ICoreConfig {
    env: string;
    server: {
        host: string;
        port: number;
    };
    db: {
        urlMain: string;
        urlTest: string;
    };
    jwt: {
        secret: string,
    };
}

export const config: ICoreConfig = {
    env: process.env.NODE_ENV || env.NODE_ENV!,
    server: {
        host: process.env.HOST || env.SERVER_HOST,
        port: Number(process.env.PORT) || env.SERVER_PORT,
    },
    db: {
        urlMain: process.env.DB_URI || env.DB_URI!,
        urlTest: process.env.DB_URI_LOCAL || env.DB_URI!,
    },
    jwt: {
        secret: process.env.JWT_SECRET || env.SESSION_SECRET!,
    },
};
