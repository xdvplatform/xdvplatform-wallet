import { KeyStorageResult } from "./KeyStorageResult";
export interface KeyStorage {
    save<T>(payload: T): Promise<KeyStorageResult>;
    find<T>(id: string): Promise<T>;
    remove(id: string): Promise<KeyStorageResult>;
    enableCrypto(password: string): Promise<void>;
}
