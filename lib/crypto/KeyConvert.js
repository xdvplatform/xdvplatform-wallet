"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyConvert = void 0;
const crypto_key_composer_1 = require("crypto-key-composer");
const jose_1 = require("jose");
const LDCryptoTypes_1 = require("./LDCryptoTypes");
const PrivateKey_1 = require("./../../src/did/PrivateKey");
const ethers_1 = require("ethers");
const bs58_1 = __importDefault(require("bs58"));
class KeyConvert {
    /**
     * Returns private keys in DER, JWK and PEM formats
     * @param kp Key pair
     * @param passphrase passphrase
     */
    static getP256(kp, passphrase) {
        const options = { password: '' };
        if (passphrase && passphrase.length > 0) {
            options.password = passphrase;
        }
        // PEM
        const composePemKey = crypto_key_composer_1.composePrivateKey({
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
        const composeDerKey = crypto_key_composer_1.composePrivateKey({
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
            pubBytes: () => ethers_1.ethers.utils.arrayify('0x' + kp.getPublic().encodeCompressed('hex')),
            privBytes: () => kp.getPrivate().toBuffer()
        };
        return {
            der: composeDerKey,
            jwk: jose_1.JWK.asKey(composePemKey),
            pem: composePemKey,
            ldSuite,
        };
    }
    /**
 * Returns private keys in DER, JWK and PEM formats
 * @param kp Key pair
 * @param passphrase passphrase
 */
    static getES256K(kp, passphrase) {
        const options = { password: '' };
        if (passphrase && passphrase.length > 0) {
            options.password = passphrase;
        }
        // DER
        const composeDerKey = crypto_key_composer_1.composePrivateKey({
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
        const composePemKey = crypto_key_composer_1.composePrivateKey({
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
            pubBytes: () => ethers_1.ethers.utils.arrayify('0x' + kp.getPublic().encodeCompressed('hex')),
            privBytes: () => kp.getPrivate().toBuffer()
        };
        return {
            der: composeDerKey,
            jwk: jose_1.JWK.asKey(composePemKey),
            pem: composePemKey,
            ldSuite,
        };
    }
    /**
     * Returns private keys in DER, JWK and PEM formats
     * @param kp Key pair
     * @param passphrase passphrase
     */
    static getEd25519(kp, passphrase) {
        const options = { password: '' };
        if (passphrase && passphrase.length > 0) {
            options.password = passphrase;
        }
        // DER
        const composeDerKey = crypto_key_composer_1.composePrivateKey({
            format: 'pkcs8-der',
            keyAlgorithm: {
                id: 'ed25519'
            },
            keyData: {
                seed: kp.getSecret(),
            }
        }, options);
        // PEM
        const composePemKey = crypto_key_composer_1.composePrivateKey({
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
            jwk: jose_1.JWK.asKey(composePemKey),
            pem: composePemKey,
        };
    }
    static createLinkedDataJsonFormat(algorithm, key, hasPrivate = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Buffer.from(ethers_1.ethers.utils.randomBytes(10000)).toString('base64');
            switch (algorithm) {
                case LDCryptoTypes_1.LDCryptoTypes.Sepc256r1:
                    return Object.assign(new PrivateKey_1.PrivateKey(), {
                        id: `did:key:${id}`,
                        type: 'EcdsaSecp256k1VerificationKey2019',
                        privateKeyBase58: hasPrivate ? bs58_1.default.encode(key.privBytes()) : undefined,
                        publicKeyBase58: bs58_1.default.encode(key.pubBytes())
                    }, {});
                    break;
                case LDCryptoTypes_1.LDCryptoTypes.Sepc256k1:
                    return Object.assign(new PrivateKey_1.PrivateKey(), {
                        id: `did:key:${id}`,
                        type: 'EcdsaSecp256k1VerificationKey2019',
                        privateKeyBase58: hasPrivate ? bs58_1.default.encode(key.privBytes()) : undefined,
                        publicKeyBase58: bs58_1.default.encode(key.pubBytes())
                    }, {});
                    break;
                case LDCryptoTypes_1.LDCryptoTypes.Ed25519:
                    return Object.assign(new PrivateKey_1.PrivateKey(), {
                        id: `did:key:${id}`,
                        type: 'Ed25519VerificationKey2018',
                        privateKeyBase58: hasPrivate ? bs58_1.default.encode(key.privBytes()) : undefined,
                        publicKeyBase58: bs58_1.default.encode(key.pubBytes())
                    }, {});
                    break;
            }
        });
    }
    /**
 * Returns private keys in JWK and PEM formats
 * @param kp Key pair
 * @param passphrase passphrase
 */
    static getRSA(rsa, passphrase) {
        return {
            jwk: rsa.toJWK(true),
            pem: rsa.toPEM(true, {
                type: 'pkcs8',
            })
        };
    }
}
exports.KeyConvert = KeyConvert;
//# sourceMappingURL=KeyConvert.js.map