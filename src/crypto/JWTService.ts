import { Wallet } from './Wallet';
import { JWTPayload } from './JWTPayload';
import { JWT, JWK } from 'jose';
import { decodeJWT, createJWT, createJWS, verifyJWS, verifyJWT, SimpleSigner } from 'did-jwt';
import { eddsa, ec } from 'elliptic';
import { ethers } from 'ethers';
export class JWTService {
    constructor() {

    }

    /**
     * Signs a did-jwt payload using EdDSA / Ed25519
     * @param key Ed25519 key
     * @param issuer DID issuer
     * @param payload JSON payload
     * @param options JWT payload config
     */
    public static signEd25519AsDID(key: eddsa.KeyPair, issuer: string, payload: any, options: JWTPayload) {
        const signer = async (payload: string | Buffer) => {
            const signature = key.sign(payload).toHex();

            const sigR = signature.slice(0, 64);
            const sigS = signature.slice(64);

            const ok = key.verify(payload, signature);
            if (ok) {
                return { R: sigR, S: sigS };
            } else {
                throw new Error('Invalid Ed25519 key');
            }
        }
        return createJWT({
            ...payload,
            ...options
        }, {
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
    public static signES256KAsDID(key: ec.KeyPair, issuer: string, payload: any, options: JWTPayload) {
        const signer = SimpleSigner(key.getPrivate().toString());
        return createJWT({
            ...payload,
            ...options
        }, {
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
    public static signES256KRAsDID(key: ec.KeyPair, issuer: string, payload: any, options: JWTPayload) {
        const signer = SimpleSigner(key.getPrivate().toString());
        return createJWT({
            ...payload,
            ...options
        }, {
            alg: 'ES256K-R',
            signer,
            issuer,
        });
    }

    public static async didVerify(signature: string, options: any) {
        const v = await verifyJWT(signature, options);
        return { ...v };
    }
    /**
     * Signs a payload using ECDSA / secp256k1
     * @param key secp256k1 key
     * @param payload JSON payload
     * @param options JWT payload config
     */
    public static signES256K(pem: string, payload: any, options: JWTPayload) {
        const key = JWK.asKey(pem)
        return JWT.sign(payload, key, {
            audience: options.aud,
            issuer: options.iss,
            iat: !!options.iat,
            // notBefore: options.nbf,
            subject: options.sub,
        });
    }


}