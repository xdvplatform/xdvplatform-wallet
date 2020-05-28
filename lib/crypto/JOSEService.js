"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JOSEService = exports.KeyRecipient = void 0;
const jose_1 = require("jose");
class KeyRecipient {
}
exports.KeyRecipient = KeyRecipient;
// protected: { enc: alg // A128GCM }
let JOSEService = /** @class */ (() => {
    class JOSEService {
        constructor() {
        }
        /**
         * Encrypts payload with JWK key
         * @param key JWK key
         * @param payload String or Buffer payload
         */
        static encrypt(key, payload) {
            const res = jose_1.JWE.encrypt.flattened(payload, key, JOSEService.DEFAULT_PROTECTED);
            return res;
        }
        /**
         * Decrypts a JWE cipher
         * @param key JWK Key
         * @param ciphertext Encrypted content
         */
        static decrypt(key, jwe) {
            const res = jose_1.JWE.decrypt(jwe, key);
            return res;
        }
        /**
         * Encrypts payload with multiple JWK keys
         * @param recipients JWK keys
         * @param payload String or Buffer payload
         */
        static encryptMultiple(recipients, payload) {
            const encryptor = new jose_1.JWE.Encrypt(payload, JOSEService.DEFAULT_PROTECTED, JOSEService.DEFAULT_UNPROTECTED);
            recipients.map(key => encryptor.recipient(key.key, key.header));
            return encryptor.encrypt('general');
        }
    }
    JOSEService.DEFAULT_PROTECTED = {
        alg: 'ECDH-ES',
        enc: 'A128CBC-HS256'
    };
    JOSEService.DEFAULT_UNPROTECTED = { cty: 'text/plain' };
    return JOSEService;
})();
exports.JOSEService = JOSEService;
//# sourceMappingURL=JOSEService.js.map