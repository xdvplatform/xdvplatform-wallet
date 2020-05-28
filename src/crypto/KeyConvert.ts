import { ec, eddsa } from 'elliptic';
import KeyEncoder from 'key-encoder/lib/key-encoder';
import { pem2jwk, jwk2pem } from 'pem-jwk';
import { decomposePrivateKey, composePrivateKey } from 'crypto-key-composer';
import { JWK } from 'jose';
export class KeyConvert {

    public static getES256KAsDER(privateKey: string) {
        const encoderOptions = {
            curveParameters: [1, 3, 132, 0, 10],
            privatePEMOptions: { label: 'EC PRIVATE KEY' },
            publicPEMOptions: { label: 'PUBLIC KEY' },
            curve: new ec('secp256k1')
        }
        const keyEncoder = new KeyEncoder(encoderOptions);

        return keyEncoder.encodePrivate(privateKey, 'raw', 'der');
    }


    public static getP256(kp: ec.KeyPair, passphrase?: string) {
        const options = { password: '' };
        if (passphrase && passphrase.length > 0) {
            options.password = passphrase;
        }
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


        return {
            jwk: JWK.asKey(composePemKey),
            pem: composePemKey
        };
    }

    public static getES256K(kp: ec.KeyPair, passphrase?: string) {
        const options = { password: '' };
        if (passphrase && passphrase.length > 0) {
            options.password = passphrase;
        }
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


        return {
            jwk: JWK.asKey(composePemKey),
            pem: composePemKey
        };
    }


    public static getEd25519(kp: eddsa.KeyPair, passphrase?: string) {
        const options = { password: '' };
        if (passphrase && passphrase.length > 0) {
            options.password = passphrase;
        }
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
            jwk: JWK.asKey(composePemKey),
            pem: composePemKey
        };
    }

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