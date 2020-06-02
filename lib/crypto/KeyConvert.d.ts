/// <reference types="node" />
import { ec, eddsa } from 'elliptic';
import { JWK } from 'jose';
import { LDCryptoTypes } from './LDCryptoTypes';
import { PrivateKey } from "./../../src/did/PrivateKey";
export declare class X509Info {
    countryName: string;
    stateOrProvinceName: string;
    localityName: string;
    organizationName: string;
    organizationalUnitName: string;
    commonName: string;
}
export declare class KeyConvert {
    static getX509RSA(kp: JWK.RSAKey, issuer: X509Info, subject: X509Info, passphrase?: string): Promise<{
        jwk: JWK.RSAKey;
        der: any;
        pem: string;
        ldSuite: {
            publicKeyJwk: import("jose").JWKRSAKey;
        };
    }>;
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
            publicKeyJwk: import("jose").JSONWebKey;
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
            publicKeyJwk: import("jose").JSONWebKey;
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
    static createLinkedDataJsonFormat(algorithm: LDCryptoTypes, key: KeyLike, hasPrivate?: boolean): (PrivateKey);
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
    publicPem?: string;
    publicJwk?: JWK.Key;
    privBytes(): Buffer | Uint8Array;
    pubBytes(): Buffer | Uint8Array;
}
