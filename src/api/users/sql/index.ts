import {sql} from '../../../core/sql';
import path from 'path';
const currPath = path.resolve(path.dirname(__filename));
export const usersSQL = {
    create: sql(path.resolve(currPath, 'create.sql')),
    empty: sql(path.resolve(currPath, 'empty.sql')),
    init: sql(path.resolve(currPath, 'init.sql')),
    drop: sql(path.resolve(currPath, 'drop.sql')),
    add: sql(path.resolve(currPath, 'insert.sql'))
};
