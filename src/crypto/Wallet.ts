import { ec, eddsa } from 'elliptic';
import { ethers } from 'ethers';
import { getMasterKeyFromSeed, getPublicKey } from 'ed25519-hd-key';
import { HDKey } from 'ethereum-cryptography/hdkey';
import { HDNode } from 'ethers/utils';
import { IsDefined, IsOptional, IsString } from 'class-validator';
import { JOSEService } from './JOSEService';
import { JWE, JWK } from 'node-jose';
import { JWTService } from './JWTService';
import { KeyConvert } from './KeyConvert';
import { LDCryptoTypes } from './LDCryptoTypes';
const PouchDB = require('pouchdb');
import {
    generateRandomSecretKey,
    deriveKeyFromMnemonic,
    deriveKeyFromEntropy,
    deriveKeyFromMaster,
    deriveEth2ValidatorKeys,
} from "@chainsafe/bls-keygen";
const PouchSession = require("session-pouchdb-store");

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


export interface KeystoreDbModel {
    _id: any;
    keypairs: KeyStoreModel;
    keystoreSeed: any;
    mnemonic: string;
    keypairExports: KeyStoreModel;
    publicKeys?: any;
}

export interface KeyStoreModel { BLS?: any, ES256K: any; P256: any; RSA: any; ED25519: any; }

export class Wallet {
    public id: any;
    private session: any;
    private db: any;

    constructor(public mnemonic: string, private ethersWallet: ethers.Wallet) {
    }

    /**
     * Gets a public key from storage
     * @param id 
     * @param algorithm 
     */
    public async getPublicKey(id: string) {
        if (this.session && !this.session.lock) throw new Error('Locked');
        
        const content = await this.db.get(id);
        return await JWK.asKey(JSON.parse(content.key), 'jwk');
    }


    /**
     * Sets a public key in storage
     * @param id 
     * @param algorithm 
     * @param value 
     */
    public async setPublicKey(id: string, algorithm: AlgorithmTypeString, value: object) {
        if (this.session && !this.session.lock) throw new Error('Locked');
        
        if ([AlgorithmType.P256_JWK_PUBLIC, AlgorithmType.RSA_JWK_PUBLIC, AlgorithmType.ED25519_JWK_PUBLIC,
        AlgorithmType.ES256K_JWK_PUBLIC].includes(AlgorithmType[algorithm])) {
            await this.db.put({
                _id: id,
                key: value
            });
        }
    }


    public static async createWallet(password: string, mnemonic?: string) {
        const id = Buffer.from(ethers.utils.randomBytes(100)).toString('base64');

        const db = new PouchDB('id', { adapter: 'leveldb' });
        PouchDB.plugin(require('crypto-pouch'));

        let wallet;
        if (mnemonic) {
            wallet = ethers.Wallet.fromMnemonic(mnemonic);
        } else {
            wallet = ethers.Wallet.createRandom();
            mnemonic = wallet.mnemonic;
        }
        const webWallet = new Wallet(mnemonic, wallet);

        let keystores: KeyStoreModel = {
            ED25519: '',
            ES256K: '',
            P256: '',
            RSA: '',
            BLS: '',
        }

        let keyExports: KeyStoreModel= {
            ED25519: '',
            ES256K: '',
            P256: '',
            RSA: '',
            BLS: '',
        }
        // ED25519
        let kp = webWallet.getEd25519();
        keystores.ED25519 = kp.getSecret('hex');
        keyExports.ED25519 = await KeyConvert.getEd25519(kp);
        keyExports.ED25519.ldJsonPublic = await KeyConvert.createLinkedDataJsonFormat(
            LDCryptoTypes.Ed25519,
            kp,
            false);


        // ES256K
        kp = webWallet.getES256K();
        keystores.ES256K = kp.getPrivate('hex');
        keyExports.ES256K = await KeyConvert.getES256K(kp);
        keyExports.ES256K.ldJsonPublic = await KeyConvert.createLinkedDataJsonFormat(
            LDCryptoTypes.JWK,
            // @ts-ignore
            { publicJwk: JSON.parse(keyExports.ES256K.ldSuite.publicKeyJwk) },
            false
        );

        // P256
        kp = webWallet.getP256();
        keystores.P256 = kp.getPrivate('hex');
        keyExports.P256 = await KeyConvert.getP256(kp);
        keyExports.P256.ldJsonPublic = await KeyConvert.createLinkedDataJsonFormat(
            LDCryptoTypes.JWK,
            // @ts-ignore
            { publicJwk: JSON.parse(keyExports.P256.ldSuite.publicKeyJwk) },
            false
        );
        // RSA
        kp = await Wallet.getRSA256Standalone();
        keystores.RSA = kp.toJSON(true);


        const keystoreMnemonicAsString = await webWallet.ethersWallet.encrypt(password);

        const model: KeystoreDbModel = {
            _id: id,
            keypairs: keystores,
            keystoreSeed: keystoreMnemonicAsString,
            mnemonic: mnemonic,
            keypairExports: keyExports
        }

        await db.put(model);
        await db.crypto(password);
        webWallet.id = id;
        webWallet.db = db;
        return webWallet;
    }

    public async getPrivateKey(algorithm: AlgorithmTypeString) {
        if (this.session && !this.session.lock) throw new Error('Locked');
        
        const ks: KeystoreDbModel = await this.db.get(this.id);

        if (algorithm === 'ED25519') {
            const kp = new eddsa('ed25519');
            return kp.keyFromSecret(ks.keypairs.ED25519);
        } else if (algorithm === 'P256') {
            const kp = new ec('p256');
            return kp.keyFromPrivate(ks.keypairExports.P256);
        } else if (algorithm === 'ES256K') {
            const kp = new ec('secp256k1');
            return kp.keyFromPrivate(ks.keypairExports.ES256K);
        }
    }

    public async getPrivateKeyExports(algorithm: AlgorithmTypeString) {
        if (this.session && !this.session.lock) throw new Error('Locked');
        const ks: KeystoreDbModel = await this.db.get(this.id);
        return ks.keypairExports[algorithm];
    }


    public async signJWT(algorithm: AlgorithmTypeString, payload: any, options: any) {
        const { pem } = await this.getPrivateKeyExports(algorithm);
        return JWTService.sign(pem, payload, options);
    }


    public async encryptJWE(algorithm: AlgorithmTypeString, payload: any) {
        const { jwk } = await this.getPrivateKeyExports(algorithm);
        return JOSEService.encrypt([jwk], payload);
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

    public  lock(password: string) {
        this.session = new PouchSession(this.db, {
            maxIdle:  15 * 60 * 1000,
            purge:  15* 60* 1000,
        });

        this.session['lock'] = password;

        return this;
    }
    
    public  unlock(password: string) {
        try {
            if (this.session['lock'] && this.session['lock'] === password) {
                return this as Wallet;
            }
            else {
                throw new Error('Invalid Session')
            }
        } catch (e) {
            throw new Error('Invalid password')
        }
    }

    /**
     * Derives a new child Wallet
     */
    public deriveChild(sequence: number, derivation = `m/44'/60'/0'/0`): Wallet {
        if (this.session && !this.session.lock) throw new Error('Locked');
        
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
        if (this.session && !this.session.lock) throw new Error('Locked');
        
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
