import {IMain} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import {Repository, SQLOps} from '../../persistence';
import {User, USER_PUBLIC_FIELDS} from '../models';
import {UserMappingService} from '../services';

export class UsersRepository extends Repository<User> {

    constructor(db: any, pgp: IMain, sqlOPS: SQLOps) {
        super(db, pgp, sqlOPS);
    }

    // Initializes the table with some records
    public init() {
        return this.db.map(this.sqlOPS.init, [], (row: { id: string }) => row.id);
    }

    // Adds a new user, and returns the new object;
    public insert(u: User): Promise<string> {
        return this.db.one(this.sqlOPS.insert, [u.email, u.firstName, u.lastName])
            .then((row: { id: string }) => row.id);
    }

    // Tries to delete a user by id, and returns the number of records deleted;
    public delete(id: string): Promise<boolean> {
        return this.db.result('DELETE FROM users WHERE id = $1', +id, (r: IResult) => r.rowCount > 0);
    }

    // Tries to find a user from id;
    public findOne(id: string): Promise<User | null> {
        return this
            .db
            .oneOrNone('SELECT ' + Object.values(USER_PUBLIC_FIELDS).join(', ') + ' FROM users WHERE id = $1', id)
            .then(UserMappingService.mapUser);
    }

    // Tries to find a user from email;
    public findByEmail(email: string): Promise<User | null> {
        return this
            .db
            .oneOrNone('SELECT ' + Object.values(USER_PUBLIC_FIELDS).join(', ') + ' FROM users WHERE email = $1', email)
            .then(UserMappingService.mapUser);
    }

    // Returns all user records;
    public findAll(): Promise<User[]> {
        return this
            .db
            .any('SELECT ' + Object.values(USER_PUBLIC_FIELDS).join(', ') + ' FROM users')
            .then(UserMappingService.mapAllUsers);
    }

    // Returns the total number of users;
    public total(): Promise<number> {
        return this.db.one('SELECT count(*) FROM users', [], (a: { count: number }) => +a.count);
    }

}
