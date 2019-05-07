import path from 'path';
import {sql} from '../../core/sql';
import {SQLOps} from '../../persistence';
const currPath = path.resolve(path.dirname(__filename));
export const usersSQLOps: SQLOps = {
    create: sql(path.resolve(currPath, 'create.sql')),
    empty: sql(path.resolve(currPath, 'empty.sql')),
    init: sql(path.resolve(currPath, 'init.sql')),
    drop: sql(path.resolve(currPath, 'drop.sql')),
    insert: sql(path.resolve(currPath, 'insert.sql'))
};
