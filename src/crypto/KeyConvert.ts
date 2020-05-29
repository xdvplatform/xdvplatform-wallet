import { ec, eddsa } from 'elliptic';
import { decomposePrivateKey, composePrivateKey } from 'crypto-key-composer';
import { JWK } from 'jose';
import { LDCryptoTypes } from './LDCryptoTypes';
import { PrivateKey } from "./../../src/did/PrivateKey";
import { ethers } from 'ethers';
import bs58 from 'bs58';
export class KeyConvert {


    /**
     * Returns private keys in DER, JWK and PEM formats
     * @param kp Key pair
     * @param passphrase passphrase 
     */
    public static getP256(kp: ec.KeyPair, passphrase?: string) {
        const options = { password: '' };
        if (passphrase && passphrase.length > 0) {
            options.password = passphrase;
        }

        // PEM
        const composePemKey = composePrivateKey({
            format: 'pkcs8-pem',
            keyAlgorithm: {
                id: 'ec',
                namedCurve: 'secp256r1',
            },
            keyData: {
                x: kp.getPublic().getX().toArrayLike(Buffer),
                y: kp.getPublic().getY().toArrayLike(Buffer),
                d: kp.getPrivate().toBuffer()
            }
        }, options);

        // DER
        const composeDerKey = composePrivateKey({
            format: 'pkcs8-der',
            keyAlgorithm: {
                id: 'ec',
                namedCurve: 'secp256r1',
            },
            keyData: {
                x: kp.getPublic().getX().toArrayLike(Buffer),
                y: kp.getPublic().getY().toArrayLike(Buffer),
                d: kp.getPrivate().toBuffer()
            }
        }, options);

        const ldSuite = {
            pubBytes: () => ethers.utils.arrayify('0x' + kp.getPublic().encodeCompressed('hex')),
            privBytes: () => kp.getPrivate().toBuffer()
        };

        return {
            der: composeDerKey,
            jwk: JWK.asKey(composePemKey),
            pem: composePemKey,
            ldSuite,
        };
    }

    /**
 * Returns private keys in DER, JWK and PEM formats
 * @param kp Key pair
 * @param passphrase passphrase 
 */
    public static getES256K(kp: ec.KeyPair, passphrase?: string) {
        const options = { password: '' };
        if (passphrase && passphrase.length > 0) {
            options.password = passphrase;
        }

        // DER
        const composeDerKey = composePrivateKey({
            format: 'pkcs8-der',
            keyAlgorithm: {
                id: 'ec',
                namedCurve: 'secp256k1',
            },
            keyData: {
                x: kp.getPublic().getX().toArrayLike(Buffer),
                y: kp.getPublic().getY().toArrayLike(Buffer),
                d: kp.getPrivate().toBuffer()
            }
        }, options);

        // PEM
        const composePemKey = composePrivateKey({
            format: 'pkcs8-pem',
            keyAlgorithm: {
                id: 'ec',
                namedCurve: 'secp256k1',
            },
            keyData: {
                x: kp.getPublic().getX().toArrayLike(Buffer),
                y: kp.getPublic().getY().toArrayLike(Buffer),
                d: kp.getPrivate().toBuffer()
            }
        }, options);


        const ldSuite = {
            pubBytes: () => ethers.utils.arrayify('0x' + kp.getPublic().encodeCompressed('hex')),
            privBytes: () => kp.getPrivate().toBuffer()
        };

        return {
            der: composeDerKey,
            jwk: JWK.asKey(composePemKey),
            pem: composePemKey,
            ldSuite,
        };
    }

    /**
     * Returns private keys in DER, JWK and PEM formats
     * @param kp Key pair
     * @param passphrase passphrase 
     */
    public static getEd25519(kp: eddsa.KeyPair, passphrase?: string) {
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

        return {
            der: composeDerKey,
            jwk: JWK.asKey(composePemKey),
            pem: composePemKey,
        };
    }


    public static async createLinkedDataJsonFormat(algorithm: LDCryptoTypes, key: KeyLike, hasPrivate = false) {
        const id = Buffer.from(ethers.utils.randomBytes(10000)).toString('base64');
        switch (algorithm) {
            case LDCryptoTypes.Sepc256r1:
                return Object.assign(
                    new PrivateKey(),
                    {
                        id: `did:key:${id}`,
                        type: 'EcdsaSecp256k1VerificationKey2019',
                        privateKeyBase58: hasPrivate ? bs58.encode(key.privBytes()) : undefined,
                        publicKeyBase58: bs58.encode(key.pubBytes())
                    }, {});
                break;
            case LDCryptoTypes.Sepc256k1:
                return Object.assign(
                    new PrivateKey(),
                    {
                        id: `did:key:${id}`,
                        type: 'EcdsaSecp256k1VerificationKey2019',
                        privateKeyBase58: hasPrivate ? bs58.encode(key.privBytes()) : undefined,
                        publicKeyBase58: bs58.encode(key.pubBytes())
                    }, {});
                break;
            case LDCryptoTypes.Ed25519:
                return Object.assign(
                    new PrivateKey(),
                    {
                        id: `did:key:${id}`,
                        type: 'Ed25519VerificationKey2018',
                        privateKeyBase58: hasPrivate ? bs58.encode(key.privBytes()) : undefined,
                        publicKeyBase58: bs58.encode(key.pubBytes())
                    }, {});
                break;
        }
    }
    /**
 * Returns private keys in JWK and PEM formats
 * @param kp Key pair
 * @param passphrase passphrase 
 */
    public static getRSA(rsa: JWK.RSAKey, passphrase?: string) {
        return {
            jwk: rsa.toJWK(true),
            pem: rsa.toPEM(true, {
                type: 'pkcs8',
                // passphrase,
            })
        };
    }


}


export interface KeyLike {
    privBytes(): Buffer | Uint8Array;
    pubBytes(): Buffer | Uint8Array;
}