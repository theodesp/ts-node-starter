import {IDatabase, IMain} from 'pg-promise';

export class Repository {
    protected db: IDatabase<any>;
    protected pgp: IMain;

    constructor(db: any, pgp: IMain) {
        this.db = db;
        this.pgp = pgp; // library's root, if ever needed;
    }
}
