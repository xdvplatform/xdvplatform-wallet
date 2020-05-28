import { JWE, JWK } from 'jose';


export class KeyRecipient {
    header: any;
    key: JWK.Key;
}
// protected: { enc: alg // A128GCM }
export class JOSEService {
    public static DEFAULT_PROTECTED = {
        alg: 'ECDH-ES',
        enc: 'A128CBC-HS256'
    };
    public static DEFAULT_UNPROTECTED = { cty: 'text/plain' };
    constructor() {

    }

    /**
     * Encrypts payload with JWK key
     * @param key JWK key
     * @param payload String or Buffer payload
     */
    public static encrypt(key: JWK.Key | any, payload: string | Buffer) {
        const res = JWE.encrypt.flattened(payload, key, JOSEService.DEFAULT_PROTECTED);
        return res;
    }


    /**
     * Decrypts a JWE cipher
     * @param key JWK Key
     * @param ciphertext Encrypted content
     */
    public static decrypt(key: JWK.Key, jwe: JWE.FlattenedJWE): Buffer {
        const res = JWE.decrypt(jwe, key);
        return res;
    }

    /**
     * Encrypts payload with multiple JWK keys
     * @param recipients JWK keys
     * @param payload String or Buffer payload
     */
    public static encryptMultiple(recipients: KeyRecipient[], payload: string | Buffer) {
        const encryptor = new JWE.Encrypt(payload, JOSEService.DEFAULT_PROTECTED, JOSEService.DEFAULT_UNPROTECTED);
        recipients.map(key => encryptor.recipient(key.key, key.header));
        return encryptor.encrypt('general');
    }
}