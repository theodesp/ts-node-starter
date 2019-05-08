import {IMain} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import {CommonSQL, Repository} from '../../core/persistence';
import {User, USER_PUBLIC_FIELDS} from '../models';
import userMappingService from '../services/userMapping.service';

const userPublicFields = Object.values(USER_PUBLIC_FIELDS).join(', ');

export class UsersRepository extends Repository<User> {

    constructor(db: any, pgp: IMain, commonSQL: CommonSQL) {
        super(db, pgp, commonSQL);
    }

    // Initializes the table with some records
    public init() {
        return this.db.map(this.commonSQL.init, [], (row: { id: string }) => row.id);
    }

    public insert(u: User): Promise<string> {
        return this.db.one(this.commonSQL.insert, [u.email, u.firstName, u.lastName, u.password])
            .then((row: { id: string }) => row.id);
    }

    public delete(id: string): Promise<boolean> {
        return this.db.result('DELETE FROM users WHERE id = $1', +id, (r: IResult) => r.rowCount > 0);
    }

    public findOne(id: string): Promise<User | null> {
        return this
            .db
            .oneOrNone('SELECT ' + userPublicFields + ' FROM users WHERE id = $1', id)
            .then(userMappingService.mapUser);
    }

    public findByEmail(email: string): Promise<User | null> {
        return this
            .db
            .oneOrNone('SELECT ' + userPublicFields + ' FROM users WHERE email = $1', email)
            .then(userMappingService.mapUser);
    }

    public findByCredentials(email: string, password: string): Promise<User | null> {
        return this
            .db
            .oneOrNone('SELECT ' + userPublicFields + ' FROM users WHERE email = $1 AND password = $2', [email, password])
            .then(userMappingService.mapUser);
    }

    public findAll(): Promise<User[]> {
        return this
            .db
            .any('SELECT ' + userPublicFields + ' FROM users')
            .then(userMappingService.mapAllUsers);
    }

    public total(): Promise<number> {
        return this.db.one('SELECT count(*) FROM users', [], (a: { count: number }) => +a.count);
    }

}
