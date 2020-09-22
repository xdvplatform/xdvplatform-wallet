/// <reference types="node" />
/// <reference types="pouchdb-core" />
import { JWK, JWE } from 'node-jose';
export declare class KeyRecipient {
    header: any;
    key: JWK.Key;
}
export declare class JOSEService {
    static DEFAULT_PROTECTED: {
        alg: string;
        enc: string;
    };
    static DEFAULT_UNPROTECTED: {
        cty: string;
    };
    constructor();
    static encrypt(keys: JWK.Key[], payload: string | Buffer): Promise<string>;
    static decrypt(key: any, jwe: string): Promise<JWE.DecryptResult>;
}
