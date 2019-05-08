import {IDatabase, IMain, QueryFile} from 'pg-promise';

export interface WriteOps<T> {
    insert(item: T): Promise<string>;
    update(id: string, item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}

export interface ReadOps<T> {
    findOne(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
}

export interface CommonSQL {
    create: QueryFile,
    empty: QueryFile,
    init: QueryFile,
    drop: QueryFile,
    insert: QueryFile,
}

export abstract class Repository<T> implements WriteOps<T>, ReadOps<T> {
    protected readonly db: IDatabase<any>;
    protected readonly pgp: IMain;
    protected readonly commonSQL: CommonSQL;

    protected constructor(db: any, pgp: IMain, commonSQL: CommonSQL) {
        this.db = db;
        this.pgp = pgp; // library's root, if ever needed;
        this.commonSQL = commonSQL; // common SQL Operations
    }

    // Creates the table;
    public async create(): Promise<boolean> {
        const result = await this.db.none(this.commonSQL.create);
        return !!result;
    }

    // Drops the table;
    public async drop(): Promise<null> {
        const result = await this.db.none(this.commonSQL.drop);
        return result;
    }

    // Removes all records from the table;
    public async empty(): Promise<null> {
        const result = await this.db.none(this.commonSQL.empty);
        return result;
    }

    public insert(item: T): Promise<string> {
        throw new Error('Method not implemented.');
    }
    public update(id: string, item: T): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    public delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    public findOne(id: string): Promise<T | null> {
        throw new Error('Method not implemented.');
    }
    public findAll(): Promise<T[]> {
        throw new Error('Method not implemented.');
    }
}
