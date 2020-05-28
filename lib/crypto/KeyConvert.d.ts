import { ec, eddsa } from 'elliptic';
import { JWK } from 'jose';
export declare class KeyConvert {
    static getES256KAsDER(privateKey: string): string;
    static getP256(kp: ec.KeyPair, passphrase?: string): {
        jwk: JWK.RSAKey | JWK.ECKey | JWK.OKPKey | JWK.OctKey;
        pem: any;
    };
    static getES256K(kp: ec.KeyPair, passphrase?: string): {
        jwk: JWK.RSAKey | JWK.ECKey | JWK.OKPKey | JWK.OctKey;
        pem: any;
    };
    static getEd25519(kp: eddsa.KeyPair, passphrase?: string): {
        jwk: JWK.RSAKey | JWK.ECKey | JWK.OKPKey | JWK.OctKey;
        pem: any;
    };
    static getRSA(rsa: JWK.RSAKey, passphrase?: string): {
        jwk: import("jose").JWKRSAKey;
        pem: string;
    };
}
