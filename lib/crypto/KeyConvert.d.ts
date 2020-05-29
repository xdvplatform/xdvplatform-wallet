/// <reference types="node" />
import { ec, eddsa } from 'elliptic';
import { JWK } from 'jose';
import { LDCryptoTypes } from './LDCryptoTypes';
import { PrivateKey } from "./../../src/did/PrivateKey";
export declare class KeyConvert {
    /**
     * Returns private keys in DER, JWK and PEM formats
     * @param kp Key pair
     * @param passphrase passphrase
     */
    static getP256(kp: ec.KeyPair, passphrase?: string): {
        der: any;
        jwk: JWK.RSAKey | JWK.ECKey | JWK.OKPKey | JWK.OctKey;
        pem: any;
        ldSuite: {
            pubBytes: () => Uint8Array;
            privBytes: () => Buffer;
        };
    };
    /**
 * Returns private keys in DER, JWK and PEM formats
 * @param kp Key pair
 * @param passphrase passphrase
 */
    static getES256K(kp: ec.KeyPair, passphrase?: string): {
        der: any;
        jwk: JWK.RSAKey | JWK.ECKey | JWK.OKPKey | JWK.OctKey;
        pem: any;
        ldSuite: {
            pubBytes: () => Uint8Array;
            privBytes: () => Buffer;
        };
    };
    /**
     * Returns private keys in DER, JWK and PEM formats
     * @param kp Key pair
     * @param passphrase passphrase
     */
    static getEd25519(kp: eddsa.KeyPair, passphrase?: string): {
        der: any;
        jwk: JWK.RSAKey | JWK.ECKey | JWK.OKPKey | JWK.OctKey;
        pem: any;
    };
    static createLinkedDataJsonFormat(algorithm: LDCryptoTypes, key: KeyLike, hasPrivate?: boolean): Promise<(PrivateKey & {
        id: string;
        type: string;
        privateKeyBase58: any;
        publicKeyBase58: any;
    }) | (PrivateKey & {
        id: string;
        type: string;
        privateKeyBase58: any;
        publicKeyBase58: any;
    }) | (PrivateKey & {
        id: string;
        type: string;
        privateKeyBase58: any;
        publicKeyBase58: any;
    })>;
    /**
 * Returns private keys in JWK and PEM formats
 * @param kp Key pair
 * @param passphrase passphrase
 */
    static getRSA(rsa: JWK.RSAKey, passphrase?: string): {
        jwk: import("jose").JWKRSAKey;
        pem: string;
    };
}
export interface KeyLike {
    privBytes(): Buffer | Uint8Array;
    pubBytes(): Buffer | Uint8Array;
}
