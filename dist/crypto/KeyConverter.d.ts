/// <reference types="node" />
/// <reference types="pouchdb-core" />
import { JWK } from 'node-jose';
import { ec, eddsa } from 'elliptic';
import { LDCryptoTypes } from './LDCryptoTypes';
import { PrivateKey } from '../did/PrivateKey';
import { PublicKey } from '../did';
export declare class X509Info {
    countryName: string;
    stateOrProvinceName: string;
    localityName: string;
    organizationName: string;
    organizationalUnitName: string;
    commonName: string;
}
export declare class KeyConverter {
    static getX509RSA(kp: any): Promise<{
        jwk: any;
        der: any;
        pemAsPrivate: any;
        pemAsPublic: any;
        ldSuite: {
            publicKeyJwk: any;
        };
    }>;
    static getP256(kp: ec.KeyPair, passphrase?: string): Promise<{
        der: any;
        pem: any;
        jwk?: undefined;
        ldSuite?: undefined;
    } | {
        der: any;
        jwk: any;
        pem: any;
        ldSuite: {
            publicKeyJwk: string;
            pubBytes: () => Uint8Array;
            privBytes: () => Buffer;
        };
    }>;
    static getES256K(kp: ec.KeyPair, passphrase?: string): Promise<{
        der: any;
        pem: any;
        ldJsonPublic: any;
        jwk?: undefined;
        ldSuite?: undefined;
    } | {
        der: any;
        jwk: any;
        pem: any;
        ldJsonPublic: any;
        ldSuite: {
            publicKeyJwk: string;
            pubBytes: () => Uint8Array;
            privBytes: () => Buffer;
        };
    }>;
    static openEncryptedPEMtoJWK(pem: string, passphrase: string): Promise<any>;
    static getEd25519(kp: eddsa.KeyPair, passphrase?: string): Promise<{
        der: any;
        pem: any;
        ldJsonPublic: any;
    }>;
    static createLinkedDataJsonFormat(algorithm: LDCryptoTypes, key: KeyLike, hasPrivate?: boolean): PublicKey | PrivateKey;
    static getRSA(rsa: any): {
        jwk: Promise<JWK.Key>;
        pem: Promise<JWK.Key>;
    };
}
export interface KeyLike {
    publicPem?: string;
    publicJwk?: JWK.Key;
    privBytes(): Buffer | Uint8Array;
    pubBytes(): Buffer | Uint8Array;
}
