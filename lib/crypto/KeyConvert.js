"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyConvert = void 0;
const elliptic_1 = require("elliptic");
const key_encoder_1 = __importDefault(require("key-encoder/lib/key-encoder"));
const crypto_key_composer_1 = require("crypto-key-composer");
const jose_1 = require("jose");
class KeyConvert {
    static getES256KAsDER(privateKey) {
        const encoderOptions = {
            curveParameters: [1, 3, 132, 0, 10],
            privatePEMOptions: { label: 'EC PRIVATE KEY' },
            publicPEMOptions: { label: 'PUBLIC KEY' },
            curve: new elliptic_1.ec('secp256k1')
        };
        const keyEncoder = new key_encoder_1.default(encoderOptions);
        return keyEncoder.encodePrivate(privateKey, 'raw', 'der');
    }
    static getP256(kp, passphrase) {
        const options = { password: '' };
        if (passphrase && passphrase.length > 0) {
            options.password = passphrase;
        }
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
        return {
            jwk: jose_1.JWK.asKey(composePemKey),
            pem: composePemKey
        };
    }
    static getES256K(kp, passphrase) {
        const options = { password: '' };
        if (passphrase && passphrase.length > 0) {
            options.password = passphrase;
        }
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
        return {
            jwk: jose_1.JWK.asKey(composePemKey),
            pem: composePemKey
        };
    }
    static getEd25519(kp, passphrase) {
        const options = { password: '' };
        if (passphrase && passphrase.length > 0) {
            options.password = passphrase;
        }
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
            jwk: jose_1.JWK.asKey(composePemKey),
            pem: composePemKey
        };
    }
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