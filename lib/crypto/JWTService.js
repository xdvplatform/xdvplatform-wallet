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
exports.JWTService = void 0;
const jose_1 = require("jose");
const did_jwt_1 = require("did-jwt");
class JWTService {
    constructor() {
    }
    /**
     * Signs a did-jwt payload using EdDSA / Ed25519
     * @param key Ed25519 key
     * @param issuer DID issuer
     * @param payload JSON payload
     * @param options JWT payload config
     */
    static signEd25519AsDID(key, issuer, payload, options) {
        const signer = (payload) => __awaiter(this, void 0, void 0, function* () {
            const signature = key.sign(payload).toHex();
            const sigR = signature.slice(0, 64);
            const sigS = signature.slice(64);
            const ok = key.verify(payload, signature);
            if (ok) {
                return { R: sigR, S: sigS };
            }
            else {
                throw new Error('Invalid Ed25519 key');
            }
        });
        return did_jwt_1.createJWT(Object.assign(Object.assign({}, payload), options), {
            alg: 'Ed25519',
            // @ts-ignore
            signer,
            issuer,
        });
    }
    /**
     * Signs a did-jwt payload using ECDSA / sepc25k1
     * @param key secp256k1 key
     * @param issuer DID issuer
     * @param payload JSON payload
     * @param options JWT payload config
     */
    static signES256KAsDID(key, issuer, payload, options) {
        const signer = did_jwt_1.SimpleSigner(key.getPrivate().toString());
        return did_jwt_1.createJWT(Object.assign(Object.assign({}, payload), options), {
            alg: 'ES256K',
            signer,
            issuer,
        });
    }
    /**
     * Signs a did-jwt payload using ECDSA / P256 - ES256K-R
     * @param key ES256K-R key
     * @param issuer DID issuer
     * @param payload JSON payload
     * @param options JWT payload config
     */
    static signES256KRAsDID(key, issuer, payload, options) {
        const signer = did_jwt_1.SimpleSigner(key.getPrivate().toString());
        return did_jwt_1.createJWT(Object.assign(Object.assign({}, payload), options), {
            alg: 'ES256K-R',
            signer,
            issuer,
        });
    }
    static didVerify(signature, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const v = yield did_jwt_1.verifyJWT(signature, options);
            return Object.assign({}, v);
        });
    }
    /**
     * Signs a payload using ECDSA / secp256k1
     * @param key secp256k1 key
     * @param payload JSON payload
     * @param options JWT payload config
     */
    static signES256K(pem, payload, options) {
        const key = jose_1.JWK.asKey(pem);
        return jose_1.JWT.sign(payload, key, {
            audience: options.aud,
            issuer: options.iss,
            iat: !!options.iat,
            // notBefore: options.nbf,
            subject: options.sub,
        });
    }
}
exports.JWTService = JWTService;
//# sourceMappingURL=JWTService.js.map