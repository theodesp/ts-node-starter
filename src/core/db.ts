import {Pool, QueryArrayConfig, QueryConfig, QueryResult} from 'pg';
import { env } from './settings';

export interface DB {
    query: (text: string, params?: string[]) => Promise<QueryResult>;
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

    public disconnect(): Promise<void> {
        return this.driver.end();
    }
}

export default new Postgres(new Pool({
    connectionString: env.DB_URI,
}))
