import { Wallet } from './Wallet';
import { JWTPayload } from './JWTPayload';
import { JWT, JWK } from 'jose';
import { decodeJWT, createJWT, createJWS, verifyJWS, verifyJWT, SimpleSigner } from 'did-jwt';
export class JWTSigner {
    constructor(private wallet: Wallet) {

    }

    public signES256KAsDID(issuer: string, payload: any, options: JWTPayload) {
        const signer = SimpleSigner(this.wallet.getES256K().getPrivate().toString());
        return createJWT({
            ...payload,
            ...options
        }, {
            alg: 'ES256K',
            signer,
            issuer,
        });
    }

    public signES256KRAsDID(issuer: string, payload: any, options: JWTPayload) {
        const signer = SimpleSigner(this.wallet.getP256().getPrivate().toString());
        return createJWT({
            ...payload,
            ...options
        }, {
            alg: 'ES256K-R',
            signer,
            issuer,
        });
    }

    public signES256K(payload: any, options: JWTPayload) {
        const key = JWK.asKey(this.wallet.getES256KAsPEM())
        return JWT.sign(payload, key, {
            audience: options.aud,
            issuer: options.iss,
            iat: !!options.iat,
            // notBefore: options.nbf,
            subject: options.sub,
        });
    }
}