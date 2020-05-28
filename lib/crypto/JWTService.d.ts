import { JWTPayload } from './JWTPayload';
import { eddsa, ec } from 'elliptic';
export declare class JWTService {
    constructor();
    /**
     * Signs a did-jwt payload using EdDSA / Ed25519
     * @param key Ed25519 key
     * @param issuer DID issuer
     * @param payload JSON payload
     * @param options JWT payload config
     */
    static signEd25519AsDID(key: eddsa.KeyPair, issuer: string, payload: any, options: JWTPayload): Promise<string>;
    /**
     * Signs a did-jwt payload using ECDSA / sepc25k1
     * @param key secp256k1 key
     * @param issuer DID issuer
     * @param payload JSON payload
     * @param options JWT payload config
     */
    static signES256KAsDID(key: ec.KeyPair, issuer: string, payload: any, options: JWTPayload): Promise<string>;
    /**
     * Signs a did-jwt payload using ECDSA / P256 - ES256K-R
     * @param key ES256K-R key
     * @param issuer DID issuer
     * @param payload JSON payload
     * @param options JWT payload config
     */
    static signES256KRAsDID(key: ec.KeyPair, issuer: string, payload: any, options: JWTPayload): Promise<string>;
    static didVerify(signature: string, options: any): Promise<{
        payload: any;
        doc: import("did-resolver").DIDDocument;
        issuer: string;
        signer: object;
        jwt: string;
    }>;
    /**
     * Signs a payload using ECDSA / secp256k1
     * @param key secp256k1 key
     * @param payload JSON payload
     * @param options JWT payload config
     */
    static signES256K(pem: string, payload: any, options: JWTPayload): string;
}
