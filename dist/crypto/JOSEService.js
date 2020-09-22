"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JOSEService = exports.KeyRecipient = void 0;
const node_jose_1 = require("node-jose");
class KeyRecipient {
}
exports.KeyRecipient = KeyRecipient;
let JOSEService = (() => {
    class JOSEService {
        constructor() { }
        static encrypt(keys, payload) {
            return node_jose_1.JWE.createEncrypt([...keys])
                .update(payload)
                .final();
        }
        static decrypt(key, jwe) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield node_jose_1.JWE.createDecrypt(yield node_jose_1.JWK.asKey(key, 'pem')).decrypt(jwe);
            });
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
