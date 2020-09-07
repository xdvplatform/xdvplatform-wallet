import * as jose from 'node-jose';
import bs58 from 'bs58';
import { composePrivateKey, decomposePrivateKey } from 'crypto-key-composer';
import { ec, eddsa } from 'elliptic';
import { ethers } from 'ethers';
import { LDCryptoTypes } from './LDCryptoTypes';
import { PrivateKey } from '../did/PrivateKey';
import { PublicKey } from '../did';
import Rasha from 'rasha';
const { JWK } = jose;
import ECKey from 'ec-key';
import { JWK } from 'node-jose';

export class X509Info {
    countryName: string;
    stateOrProvinceName: string;
    localityName: string;
    organizationName: string;
    organizationalUnitName: string;
    commonName: string;
}

export class KeyConvert {

    public static async getX509RSA(kp: JWK.RSAKey) {


        let jwk = kp;
        // jwk = { alg: 'RS256', ...jwk };
        const ldSuite = {
            publicKeyJwk: kp.toJSON(),
        }

        return {
            jwk,
            der: undefined,
            pemAsPrivate: await Rasha.export({ jwk: kp.toJSON(true) }),
            pemAsPublic: await Rasha.export({ jwk: kp.toJSON() }),
            ldSuite,
        };
    }

    /**
     * Returns private keys in DER, JWK and PEM formats
     * @param kp Key pair
     * @param passphrase passphrase 
     */
    public static async getP256(kp: ec.KeyPair, passphrase?: string) {
        const options = { password: '' };
        if (passphrase && passphrase.length > 0) {
            options.password = passphrase;
        }

        // PEM
        const composePemKey = composePrivateKey({
            format: 'raw-pem',
            keyAlgorithm: {
                id: 'ec',
                namedCurve: 'secp256r1',
            },
            keyData: {
                x: kp.getPublic().getX().toArrayLike(Buffer),
                y: kp.getPublic().getY().toArrayLike(Buffer),
                d: kp.getPrivate().toArrayLike(Buffer)
            }
        }, options);

        // DER
        const composeDerKey = composePrivateKey({
            format: 'raw-der',
            keyAlgorithm: {
                id: 'ec',
                namedCurve: 'secp256r1',
            },
            keyData: {
                x: kp.getPublic().getX().toArrayLike(Buffer),
                y: kp.getPublic().getY().toArrayLike(Buffer),
                d: kp.getPrivate().toArrayLike(Buffer)
            }
        }, options);

        if (passphrase) {
            return {
                der: composeDerKey,
                pem: composePemKey,
            }
        }
        const keys = new ECKey(composePemKey, 'pem');
        const ldSuite = {
            publicKeyJwk: JSON.stringify(keys.toJSON()),
            pubBytes: () => ethers.utils.arrayify('0x' + kp.getPublic().encodeCompressed('hex')),
            privBytes: () => kp.getPrivate().toArrayLike(Buffer)
        };

        return {
            der: composeDerKey,
            jwk: keys.toJSON(true),
            pem: composePemKey,
            ldSuite,
        };
    }

    /**
 * Returns private keys in DER, JWK and PEM formats
 * @param kp Key pair
 * @param passphrase passphrase 
 */
    public static async getES256K(kp: ec.KeyPair, passphrase?: string) {
        const options = { password: '' };
        if (passphrase && passphrase.length > 0) {
            options.password = passphrase;
        }

        // DER
        const composeDerKey = composePrivateKey({
            format: 'raw-der',
            keyAlgorithm: {
                id: 'ec',
                namedCurve: 'secp256k1',
            },
            keyData: {
                x: kp.getPublic().getX().toArrayLike(Buffer),
                y: kp.getPublic().getY().toArrayLike(Buffer),
                d: kp.getPrivate().toArrayLike(Buffer)
            }
        }, options);

        // PEM
        const composePemKey = composePrivateKey({
            format: 'raw-pem',
            keyAlgorithm: {
                id: 'ec',
                namedCurve: 'secp256k1',
            },
            keyData: {
                x: kp.getPublic().getX().toArrayLike(Buffer),
                y: kp.getPublic().getY().toArrayLike(Buffer),
                d: kp.getPrivate().toArrayLike(Buffer)
            }
        }, options);

        if (passphrase) {
            return {
                der: composeDerKey,
                pem: composePemKey,
                ldJsonPublic: null
            }
        }
        const keys = new ECKey(composePemKey, 'pem');
        const ldSuite = {
            publicKeyJwk: JSON.stringify(keys.toJSON()),
            pubBytes: () => ethers.utils.arrayify('0x' + kp.getPublic().encodeCompressed('hex')),
            privBytes: () => kp.getPrivate().toArrayLike(Buffer)
        };

        return {
            der: composeDerKey,
            jwk: keys.toJSON(true),
            pem: composePemKey,
            ldJsonPublic: null
            ldSuite,
        };
    }

    public static async openEncryptedPEMtoJWK(pem: string, passphrase: string) {
        const obj = decomposePrivateKey(pem, {
            passphrase,
        })
        const composePem = composePrivateKey(obj);
        const keys = new ECKey(composePem, 'pem');

        return keys.toJSON(true);
    }
    /**
     * Returns private keys in DER, JWK and PEM formats
     * @param kp Key pair
     * @param passphrase passphrase 
     */
    public static async getEd25519(kp: eddsa.KeyPair, passphrase?: string) {
        const options = { password: '' };
        if (passphrase && passphrase.length > 0) {
            options.password = passphrase;
        }
        // DER
        const composeDerKey = composePrivateKey({
            format: 'pkcs8-der',
            keyAlgorithm: {
                id: 'ed25519'
            },
            keyData: {
                seed: kp.getSecret(),
            }
        }, options);

        // PEM
        const composePemKey = composePrivateKey({
            format: 'pkcs8-pem',
            keyAlgorithm: {
                id: 'ed25519'
            },
            keyData: {
                seed: kp.getSecret(),
            }
        }, options);

        /// const keys = new ECKey(composePemKey, 'pem');
        return {
            der: composeDerKey,
            //  jwk: keys.toJSON(),
            pem: composePemKey,
            ldJsonPublic: null
        };
    }


    public static createLinkedDataJsonFormat(algorithm: LDCryptoTypes, key: KeyLike, hasPrivate = false): PublicKey | PrivateKey {
        const id = Buffer.from(ethers.utils.randomBytes(100)).toString('base64');
        switch (algorithm) {

            case LDCryptoTypes.JWK:
                return Object.assign(
                    new PublicKey(),
                    {
                        id: `did:key:${id}`,
                        type: 'JwsVerificationKey2020',
                        publicKeyJwk: key.publicJwk,
                    }, {});

            case LDCryptoTypes.RSA:
                return Object.assign(
                    new PublicKey(),
                    {
                        id: `did:key:${id}`,
                        type: 'RsaVerificationKey2018',
                        publicKeyPem: key.publicPem,
                    }, {});

            case LDCryptoTypes.Sepc256r1:
                return Object.assign(
                    new PrivateKey(),
                    {
                        id: `did:key:${id}`,
                        type: 'EcdsaSecp256k1VerificationKey2019',
                        privateKeyBase58: hasPrivate ? bs58.encode(key.privBytes()) : undefined,
                        publicKeyBase58: bs58.encode(key.pubBytes())
                    }, {});
            case LDCryptoTypes.Sepc256k1:
                return Object.assign(
                    new PrivateKey(),
                    {
                        id: `did:key:${id}`,
                        type: 'EcdsaSecp256k1VerificationKey2019',
                        privateKeyBase58: hasPrivate ? bs58.encode(key.privBytes()) : undefined,
                        publicKeyBase58: bs58.encode(key.pubBytes())
                    }, {});
            case LDCryptoTypes.Ed25519:
                return Object.assign(
                    new PrivateKey(),
                    {
                        id: `did:key:${id}`,
                        type: 'Ed25519VerificationKey2018',
                        privateKeyBase58: hasPrivate ? bs58.encode(key.privBytes()) : undefined,
                        publicKeyBase58: bs58.encode(key.pubBytes())
                    }, {});
        }
    }
    /**
 * Returns private keys in JWK and PEM formats
 * @param kp Key pair
 * @param passphrase passphrase 
 */
    public static getRSA(rsa: any) {
        return {
            jwk: JWK.asKey(rsa, "json"),
            pem: JWK.asKey(rsa, 'pkcs8')
        };
    }


}


export interface KeyLike {
    publicPem?: string,
    publicJwk?: JWK.Key,
    privBytes(): Buffer | Uint8Array;
    pubBytes(): Buffer | Uint8Array;
}