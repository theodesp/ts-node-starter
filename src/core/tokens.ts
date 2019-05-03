import {createContextToken, reader} from '@marblejs/core';
import {Pool} from 'pg';
import {Postgres} from './db';

export const dbToken = createContextToken<Postgres>();
export const db = (connectionString: string) => reader.map(() => new Postgres(
    new Pool({
        connectionString,
    })));
