/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
import { KeyStorage } from "./KeyStorage";
import { KeyStorageResult } from "./KeyStorageResult";
export declare class PouchdbKeyStorage implements KeyStorage {
    private db;
    constructor(db: PouchDB.Database);
    save<T>(payload: T): Promise<KeyStorageResult>;
    find<T>(id: string): Promise<T>;
    remove(id: string): Promise<KeyStorageResult>;
    enableCrypto(password: string): Promise<void>;
}
