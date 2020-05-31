"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jose_1 = require("jose");
class JWTService {
    constructor() {
    }
    static decodeWithSignature(jwt) {
        const decoded = Object.assign(Object.assign({}, jose_1.JWT.decode(jwt, { 'complete': true })), { data: `${jwt.split('.')[0]}.${jwt.split('.')[1]}` });
        return decoded;
    }
    /**
     * Signs a payload
     * @param key PEM format key
     * @param payload JSON payload
     * @param options JWT payload config
     */
    static sign(pem, payload, options) {
        const key = typeof pem === 'string' ? jose_1.JWK.asKey(pem) : pem;
        return jose_1.JWT.sign(payload, key, {
            audience: options.aud,
            issuer: options.iss,
            iat: !!options.iat,
            // notBefore: options.nbf,
            subject: options.sub,
        });
    }
    /**
     * Verifies a signed message
     * @param key PEM format key
     * @param signature Signature
     * @param options JWT payload config
     */
    static verify(pem, signature, audience) {
        const key = jose_1.JWK.asKey(pem);
        return jose_1.JWT.verify(signature, key, { audience });
    }
}
exports.JWTService = JWTService;
//# sourceMappingURL=JWTService.js.map