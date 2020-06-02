import { JWTPayload } from './JWTPayload';
export declare class JWTService {
    constructor();
    static decodeWithSignature(jwt: string): any;
    /**
     * Signs a payload
     * @param key PEM format key
     * @param payload JSON payload
     * @param options JWT payload config
     */
    static sign(pem: any, payload: any, options: JWTPayload): any;
    /**
     * Verifies a signed message
     * @param key PEM format key
     * @param signature Signature
     * @param options JWT payload config
     */
    static verify(pem: string, signature: any, audience: string | string[]): any;
}
