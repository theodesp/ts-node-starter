import {ColumnSet, IMain} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import {Repository} from '../../../persistence';
import {usersSQL} from '../sql';

interface UserColumnsets {
    insert?: ColumnSet,
    update?: ColumnSet
}

export class UsersRepository extends Repository {

    // ColumnSet objects static namespace:
    private static cs: UserColumnsets;

    constructor(db: any, pgp: IMain) {
        super(db, pgp);
        // set-up all ColumnSet objects, if needed:
        this.createColumnsets();
    }

    // Creates the table;
    public create() {
        return this.db.none(usersSQL.create);
    }

    // Initializes the table with some user records, and return their id-s;
    public init() {
        return this.db.map(usersSQL.init, [], (row: { id: string }) => row.id);
    }

    // Drops the table;
    public drop() {
        return this.db.none(usersSQL.drop);
    }

    // Removes all records from the table;
    public empty() {
        return this.db.none(usersSQL.empty);
    }

    // Adds a new user, and returns the new object;
    public add(name: string) {
        return this.db.one(usersSQL.add, name);
    }

    // Tries to delete a user by id, and returns the number of records deleted;
    public remove(id: string) {
        return this.db.result('DELETE FROM users WHERE id = $1', +id, (r: IResult) => r.rowCount);
    }

    // Tries to find a user from id;
    public findById(id: string) {
        return this.db.oneOrNone('SELECT * FROM users WHERE id = $1', +id);
    }

    // Tries to find a user from name;
    public findByName(name: string) {
        return this.db.oneOrNone('SELECT * FROM users WHERE name = $1', name);
    }

    // Returns all user records;
    public all() {
        return this.db.any('SELECT * FROM users');
    }

    // Returns the total number of users;
    public total() {
        return this.db.one('SELECT count(*) FROM users', [], (a: { count: number }) => +a.count);
    }

    // example of setting up ColumnSet objects:
    private createColumnsets() {
        // create all ColumnSet objects only once:
        if (!UsersRepository.cs) {
            const helpers = this.pgp.helpers;
            const cs: UserColumnsets = {};

            // Type TableName is useful when schema isn't default "public" ,
            // otherwise you can just pass in a string for the table name.
            const table = new helpers.TableName({table: 'user', schema: 'public'});

            cs.insert = new helpers.ColumnSet(['name'], {table});
            cs.update = cs.insert.extend(['?id']);

            UsersRepository.cs = cs;
        }
    }

}
