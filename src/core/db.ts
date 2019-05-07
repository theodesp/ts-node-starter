import * as promise from 'bluebird';
import {IDatabase, IMain, IOptions} from 'pg-promise';
import pgPromise from 'pg-promise';
import {IExtensions} from '../persistence';
import {UsersRepository} from '../users/repositories';
import {usersSQLOps} from '../users/sql';
// Load and initialize optional diagnostics:
import {init} from './diagnostics';
import {env} from './settings';

// pg-promise initialization options:
const initOptions: IOptions<IExtensions> = {

    // Using a custom promise library, instead of the default ES6 Promise.
    // To make the custom promise protocol visible, you need to patch the
    // following file: node_modules/pg-promise/typescript/ext-promise.d.ts
    promiseLib: promise,

    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend(obj: IExtensions, dc: any) {
        // Database Context (dc) is mainly needed for extending multiple databases
        // with different access API.

        obj.users = new UsersRepository(obj, pgp, usersSQLOps);
    }

};

const pgp: IMain = pgPromise(initOptions);

// Create the database instance with extensions:
const db = pgp(env.DB_URI!) as IDatabase<IExtensions> & IExtensions;

init(initOptions);

// If you ever need access to the library's root (pgp object), you can do it via db.$config.pgp
// See: http://vitaly-t.github.io/pg-promise/Database.html#.$config
export default db;
