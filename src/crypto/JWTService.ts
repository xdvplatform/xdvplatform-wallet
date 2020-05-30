import { JWTPayload } from './JWTPayload';
import { JWT, JWK } from 'jose';


export class JWTService {
    constructor() {

    }

    public static decodeWithSignature(jwt: string) {
        const decoded = {
            ...JWT.decode(jwt, { 'complete': true }),
            data: `${jwt.split('.')[0]}.${jwt.split('.')[1]}`,
        };

        return decoded;
    }

    /**
     * Signs a payload
     * @param key PEM format key
     * @param payload JSON payload
     * @param options JWT payload config
     */
    public static sign(pem: any, payload: any, options: JWTPayload) {
        const key = typeof pem === 'string' ? JWK.asKey(pem) : <JWK.Key>pem;
        return JWT.sign(payload, key, {
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
    public static verify(pem: string, signature: any, audience: string | string[]) {
        const key = JWK.asKey(pem)
        return JWT.verify(signature, key, { audience })
    }


}