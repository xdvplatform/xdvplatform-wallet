import { JWTPayload } from './JWTPayload';
export declare class JWTService {
    constructor();
    static decodeWithSignature(jwt: string): {
        data: string;
        payload: object;
        header: object;
        signature: string;
        key: undefined;
    };
    /**
     * Signs a payload
     * @param key PEM format key
     * @param payload JSON payload
     * @param options JWT payload config
     */
    static sign(pem: string, payload: any, options: JWTPayload): string;
    /**
     * Verifies a signed message
     * @param key PEM format key
     * @param signature Signature
     * @param options JWT payload config
     */
    static verify(pem: string, signature: any, audience: string | string[]): object;
}
