import { KeyStorage } from "./KeyStorage";
import { KeyStorageResult } from "./KeyStorageResult";
import PouchDB from 'pouchdb';

export class PouchdbKeyStorage implements KeyStorage {

    constructor(private db: PouchDB.Database) {
        PouchDB.plugin(require('crypto-pouch'));
    }
    
    async save<T>(payload: T): Promise<KeyStorageResult> {
        return await this.db.put<T>(payload);
    }

    async find<T>(id: string): Promise<T> {
        return await this.db.get<T>(id);
    }
    
    async remove(id: string): Promise<KeyStorageResult> {
        const item = await this.db.get(id);
        return await this.db.remove(item);
    }

    async enableCrypto(password: string): Promise<void> {
        await (this.db as any).crypto(password);
    }
}