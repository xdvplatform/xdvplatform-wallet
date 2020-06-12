import { ec } from 'elliptic';
import { eddsa } from 'elliptic';
import { ethers } from 'ethers';
import { getMasterKeyFromSeed, getPublicKey } from 'ed25519-hd-key';
import { HDKey } from 'ethereum-cryptography/hdkey';
import { HDNode } from 'ethers/utils';
import { IsDefined, IsOptional, IsString } from 'class-validator';
import { JWE, JWK } from 'node-jose';
import { KeyConvert } from './KeyConvert';
import { LDCryptoTypes } from './LDCryptoTypes';

import { ec, eddsa, } from 'elliptic';
import {
    generateRandomSecretKey,
    deriveKeyFromMnemonic,
    deriveKeyFromEntropy,
    deriveKeyFromMaster,
    deriveEth2ValidatorKeys,
} from "@chainsafe/bls-keygen";
export type AlgorithmTypeString = keyof typeof AlgorithmType;
export enum AlgorithmType {
    RSA,
    ES256K,
    P256,
    ED25519,
    BLS,
    P256_JWK_PUBLIC,
    ED25519_JWK_PUBLIC,
    ES256K_JWK_PUBLIC,
    RSA_JWK_PUBLIC,
    RSA_PEM_PUBLIC
}


export class WalletOptions {
    @IsString()
    @IsDefined()
    password: string;

    @IsOptional()
    @IsString()
    mnemonic?: string;
}

export interface IMemKeyStore {
    get: any;
    set: any;
}

export interface ISecureStore {
    getSecureValue: any;
    writeSecureValue: any;
}

export interface RootModel {
    ks: any;
    content: KeyStoreModel;
}

export interface KeyStoreModel { ES256k: string; P256: string; RSA: object; ED25519: string; }

export class Wallet {
    private inMemoryKeystore: IMemKeyStore;
    private secureStore: ISecureStore;
    id: any;

    constructor(private mnemonic: string, private ethersWallet: ethers.Wallet) {
    }


    public async getKeyPairExports(id: string, algorithm: string) {
        //        const kp = await this.getKeyPair(id, algorithm, '');


        const
            key = id + algorithm + 'exports';
        try {
            const enc = localStorage.getItem(key);

            const keypair = await this.getKeyPair(
                id,
                'P256',
                ''
            );
            const kpSuite = await KeyConvert.getP256(keypair);
            const res = await JWE.createDecrypt(
                await JWK.asKey(kpSuite.jwk, 'jwk')
            ).decrypt(enc.cipher);
            const obj = new TextDecoder('utf-8').decode(res.plaintext);
            return JSON.parse(obj)[algorithm];

        }
        catch (e) {
            // continue
        }


        let keyExports: any = {};
        algorithm = 'ES256K';

        let kp = await this.getKeyPair(id, algorithm);
        keyExports[algorithm] = await KeyConvert.getES256K(kp);
        keyExports[algorithm].ldJsonPublic = await KeyConvert.createLinkedDataJsonFormat(
            LDCryptoTypes.JWK,
            { publicJwk: JSON.parse(keyExports[algorithm].ldSuite.publicKeyJwk) },
            false
        );

        algorithm = 'P256';
        kp = await this.getKeyPair(id, algorithm);
        keyExports[algorithm] = await KeyConvert.getP256(kp);
        keyExports[algorithm].ldJsonPublic = await KeyConvert.createLinkedDataJsonFormat(
            LDCryptoTypes.JWK,
            { publicJwk: JSON.parse(keyExports[algorithm].ldSuite.publicKeyJwk) },
            false
        );
        algorithm = 'ED25519';

        kp = await this.getKeyPair(id, algorithm);
        keyExports[algorithm] = await KeyConvert.getEd25519(kp);
        keyExports[algorithm].ldJsonPublic = await KeyConvert.createLinkedDataJsonFormat(
            LDCryptoTypes.Ed25519,
            kp,
            false
        );

        // keyExports[algorithm] = await KeyConvert.getRSA(kp);
        // keyExports[algorithm].ldJsonPublic = await KeyConvert.createLinkedDataJsonFormat(
        //     LDCryptoTypes.JWK,
        //     { publicJwk: JSON.parse(keyExports.ldSuite.publicKeyJwk) },
        //     false
        // );

        const encDoc = await JWE
            .createEncrypt([keyExports.P256.jwk])
            .update(Buffer.from(JSON.stringify(keyExports)))
            .final();
        localStorage.setItem(key, JSON.stringify({ cipher: encDoc }));

        return keyExports;
    }


    public static async getPublicKey(id: string, algorithm: string) {
        let content = localStorage.getItem(id + algorithm);

        if ([AlgorithmType.P256_JWK_PUBLIC, AlgorithmType.RSA_JWK_PUBLIC, AlgorithmType.ED25519_JWK_PUBLIC,
        AlgorithmType.ES256K_JWK_PUBLIC].includes(AlgorithmType[algorithm])) {
            return await JWK.asKey(JSON.parse(content), 'jwk');
        }
    }


    public static setPublicKey(id: string, algorithm: string, value: object) {

        if ([AlgorithmType.P256_JWK_PUBLIC, AlgorithmType.RSA_JWK_PUBLIC, AlgorithmType.ED25519_JWK_PUBLIC,
        AlgorithmType.ES256K_JWK_PUBLIC].includes(AlgorithmType[algorithm])) {
            localStorage.setItem(id + algorithm, (value));
        }
    }

    public async getKeyPair(id: string, algorithm: string, password?: string) {
        let key = id + algorithm;
        let content;
        if (this.inMemoryKeystore && this.inMemoryKeystore.get(key)) {
            content = (this.inMemoryKeystore.get(key));
        } else {
            // Read value
            content = await this.secureStore.getSecureValue(key);
            content = (content);
        }
        this.inMemoryKeystore.set(key, (content));

        if (AlgorithmType[algorithm] === AlgorithmType.ES256K) {
            const ES256k = new ec('secp256k1');
            return ES256k.keyFromPrivate(content);
        }

        if (AlgorithmType[algorithm] === AlgorithmType.P256) {
            const P256 = new ec('p256');
            return P256.keyFromPrivate(content);
        }

        if (AlgorithmType[algorithm] === AlgorithmType.ED25519) {
            const ED25519 = new eddsa('ed25519');
            return ED25519.keyFromSecret(content);
        }


        // if (AlgorithmType[algorithm] === AlgorithmType.RSA) {
        //     return await JWK.asKey(content.RSA, 'jwk');
        // }
    }


    async setSecure(id: string, algorithm: AlgorithmTypeString, value: any) {
        const key = id + algorithm;
        // Write value
        return this.secureStore.writeSecureValue(key, value);
    }

    public static async createWebWallet(password: string, inMemoryKeystore: IMemKeyStore, secureStore: ISecureStore, includes: AlgorithmType[], mnemonic?: string) {
        const id = Buffer.from(ethers.utils.randomBytes(100)).toString('base64');

        let wallet;
        if (mnemonic) {
            wallet = ethers.Wallet.fromMnemonic(mnemonic);
        } else {
            wallet = ethers.Wallet.createRandom();
            mnemonic = wallet.mnemonic;
        }
        const webWallet = new Wallet(mnemonic, wallet);

        webWallet.inMemoryKeystore = inMemoryKeystore;
        webWallet.secureStore = secureStore;

        let content = {
            'ED25519': '',
            'ES256K': '',
            'P256': '',
            'RSA': '',
        }
        if (includes.includes(AlgorithmType.ED25519)) {
            const kp = webWallet.getEd25519();
            content.ED25519 = kp.getSecret('hex');
            await secureStore.writeSecureValue(id + 'ED25519', content.ED25519);

        }


        if (includes.includes(AlgorithmType.ES256K)) {
            const kp = webWallet.getES256K();
            content.ES256K = kp.getPrivate('hex');
            await secureStore.writeSecureValue(id + 'ES256K', content.ES256K);

        }


        if (includes.includes(AlgorithmType.P256)) {
            const kp = webWallet.getP256();
            content.P256 = kp.getPrivate('hex');
            await secureStore.writeSecureValue(id + 'P256', content.P256);

        }


        // if (includes.includes(AlgorithmType.RSA)) {
        //     const kp = await Wallet.getRSA256Standalone();
        //     content.RSA = kp.toJSON(true);
        // }
        const ks = await webWallet.ethersWallet.encrypt(password);
        localStorage.setItem(id + 'ks', ks);

        return { uniqueId: id, wallet: webWallet };
    }
    /**
     * Create HD Wallet
     * @param password password to encrypt      */
    public static createHDWallet(obj: WalletOptions) {
        // ethers
        const { password, mnemonic } = obj;
        let wallet;
        if (password) {
            wallet = ethers.Wallet.createRandom();
        } else {
            wallet = ethers.Wallet.fromMnemonic(mnemonic);
        }
        return wallet.encrypt(password);
    }

    /**
     * Generates a mnemonic
     */
    public static generateMnemonic() {
        return ethers.Wallet.createRandom().mnemonic;
    }

    /**
     * Unlocks a JSON keystore
     * @param keystore A JSON keystore
     * @param password password to decrypt
     */
    public static async unlock(keystore: string, password: string): Wallet {
        const ethersWallet = await ethers.Wallet.fromEncryptedJson(keystore, password);
        return new Wallet(ethersWallet.mnemonic, ethersWallet);
    }

    static async browserUnlock(id: any, password: string, inmem: any, webkeystore: any) {
        try {
            const keystore = localStorage.getItem(id + 'ks');
            if (!keystore) {
                throw new Error('Invalid keystore');
            }
            const base = await ethers.Wallet.fromEncryptedJson(
                keystore,
                password
            );
            const wallet = new Wallet(base.mnemonic, base);
            wallet.inMemoryKeystore = inmem;
            wallet.secureStore = webkeystore;
            wallet.id = id;
            return wallet;
        } catch (e) {
            throw new Error('Invalid password')
        }
        return null;
    }

    /**
     * Derives a new child Wallet
     */
    public deriveChild(sequence: number, derivation = `m/44'/60'/0'/0`): Wallet {
        const masterKey = HDNode.fromMnemonic(this.mnemonic);
        const hdnode = masterKey.derivePath(`${derivation}/${sequence}`);
        //    console.log(hdnode.path, hdnode.fingerprint, hdnode.parentFingerprint);
        const ethersWallet = new ethers.Wallet(hdnode);
        return new Wallet(ethersWallet.mnemonic, ethersWallet);
    }

    public get path() {
        return this.ethersWallet.path;
    }

    public get address() {
        return this.ethersWallet.getAddress();
    }
    /**
     * Derives a wallet from a path
     */
    public deriveFromPath(path: string): Wallet {
        const node = HDNode.fromMnemonic(this.mnemonic).derivePath(path);
        const ethersWallet = new ethers.Wallet(node);
        return new Wallet(ethersWallet.mnemonic, ethersWallet);
    }

    public getEd25519(): eddsa.KeyPair {
        const ed25519 = new eddsa('ed25519');
        // const hdkey = HDKey.fromExtendedKey(HDNode.fromMnemonic(this.mnemonic).extendedKey);
        const { key, chainCode } = getMasterKeyFromSeed(ethers.utils.HDNode.mnemonicToSeed(this.mnemonic));
        const keypair = ed25519.keyFromSecret(key);
        return keypair;
    }


    public getP256(): ec.KeyPair {
        const p256 = new ec('p256');
        const keypair = p256.keyFromPrivate(HDNode.fromMnemonic(this.mnemonic).privateKey);
        return keypair;
    }

    public getES256K(): ec.KeyPair {
        const ES256k = new ec('secp256k1');
        const keypair = ES256k.keyFromPrivate(HDNode.fromMnemonic(this.mnemonic).privateKey);
        return keypair;
    }

    public getBlsMasterKey(): any {
        const masterKey = deriveKeyFromMnemonic(this.mnemonic)
        return {
            deriveValidatorKeys: (id: number) => deriveEth2ValidatorKeys(masterKey, id)
        };
    }


    public static getRSA256Standalone(len: number = 2048): Promise<JWK.RSAKey> {
        return JWK.createKey('RSA', len, {
            alg: 'RS256',
            use: 'sig'
        });
    }


}
