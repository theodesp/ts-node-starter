import {Pool, QueryArrayConfig, QueryConfig, QueryResult} from 'pg';
// @ts-ignore
import Cursor from 'pg-cursor';
import { env } from './settings';

export interface DB {
    query: (q: string | QueryConfig | QueryArrayConfig, params?: string[]) => Promise<QueryResult>;
    disconnect: () => Promise<void>;
}

export class Postgres implements DB {
    private driver: Pool;
    constructor(driver: Pool) {
        this.driver = driver;
    }

    public async query(q: string | QueryConfig | QueryArrayConfig, params?: string[]): Promise<QueryResult>  {
        const client = await this.driver.connect();
        try {
            const res = await client.query(q, params);
            return res;
        } catch (e) {
            console.warn(e.stack);
            return Promise.reject(new Error(e));
        } finally {
            client.release()
        }
    }

    public async cursor(q: string | QueryConfig | QueryArrayConfig, params?: string[]): Promise<any> {
        const client = await this.driver.connect();
        let cursor: any;
        try {
            cursor = await client.query(new Cursor(q, params));
            cursor.release = function () {
                this.close(() => {
                    client.release()
                })
            };
            return cursor;
        } catch (e) {
            console.warn(e.stack);
            return Promise.reject(new Error(e));
        }
    }

    public disconnect(): Promise<void> {
        return this.driver.end();
    }
}

export default new Postgres(new Pool({
    connectionString: env.DB_URI,
}))
