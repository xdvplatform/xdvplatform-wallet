/// <reference types="node" />
import { JWE, JWK } from 'jose';
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
    /**
     * Encrypts payload with JWK key
     * @param key JWK key
     * @param payload String or Buffer payload
     */
    static encrypt(key: JWK.Key | any, payload: string | Buffer): any;
    /**
     * Decrypts a JWE cipher
     * @param key JWK Key
     * @param ciphertext Encrypted content
     */
    static decrypt(key: JWK.Key, jwe: JWE.FlattenedJWE): Buffer;
    /**
     * Encrypts payload with multiple JWK keys
     * @param recipients JWK keys
     * @param payload String or Buffer payload
     */
    static encryptMultiple(recipients: KeyRecipient[], payload: string | Buffer): any;
}
