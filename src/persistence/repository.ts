import {IDatabase, IMain, QueryFile} from 'pg-promise';

export interface WriteOps<T> {
    insert(item: T): Promise<boolean>;
    update(id: string, item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}

export interface ReadOps<T> {
    find(item: T): Promise<T[]>;
    findOne(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
}

export interface SQLOps {
    create: QueryFile,
    empty: QueryFile,
    init: QueryFile,
    drop: QueryFile,
    insert: QueryFile,
}

export abstract class Repository<T> implements WriteOps<T>, ReadOps<T> {
    protected readonly db: IDatabase<any>;
    protected readonly pgp: IMain;
    protected readonly sqlOPS: SQLOps;

    protected constructor(db: any, pgp: IMain, sqlOPS: SQLOps) {
        this.db = db;
        this.pgp = pgp; // library's root, if ever needed;
        this.sqlOPS = sqlOPS; // library's root, if ever needed;
    }

    // Creates the table;
    public async create(): Promise<boolean> {
        const result = await this.db.none(this.sqlOPS.create);
        return !!result;
    }

    // Drops the table;
    public drop(): Promise<null> {
        return this.db.none(this.sqlOPS.drop);
    }

    // Removes all records from the table;
    public empty(): Promise<null> {
        return this.db.none(this.sqlOPS.empty);
    }

    public insert(item: T): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    public update(id: string, item: T): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    public delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    public find(item: T): Promise<T[]> {
        throw new Error('Method not implemented.');
    }
    public findOne(id: string): Promise<T | null> {
        throw new Error('Method not implemented.');
    }
    public findAll(): Promise<T[]> {
        throw new Error('Method not implemented.');
    }
}
