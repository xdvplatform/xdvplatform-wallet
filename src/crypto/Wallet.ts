import PouchDB from 'pouchdb';
import { ec, eddsa } from 'elliptic';
import { ethers } from 'ethers';
import { getMasterKeyFromSeed } from 'ed25519-hd-key';
import { HDNode } from 'ethers/utils';
import { IsDefined, IsOptional, IsString } from 'class-validator';
import { JOSEService } from './JOSEService';
import { JWE, JWK } from 'node-jose';
import { JWTService } from './JWTService';
import { KeyConvert } from './KeyConvert';
import { LDCryptoTypes } from './LDCryptoTypes';
import { Subject } from 'rxjs';
import { SwarmFeed } from '../swarm/feed';
import {
    deriveKeyFromMnemonic,
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
    public id: string;
    public onRequestPassphraseSubscriber: Subject = new Subject<string>();
    public onRequestPassphraseWallet: Subject = new Subject<string>();
    public onSignExternal: Subject = new Subject<{
        isEnabled: boolean;
        signature: string | Buffer;
    }>();
    private db = new PouchDB('xdv:web:wallet');
    ethersWallet: any;
    mnemonic: any;
    accepted: any;
    constructor() {
        PouchDB.plugin(require('crypto-pouch'));
    }


    /**
     * Creates a new queryable swarm feed
     * @param user 
     */
    public getSwarmNodeQueryable(user: any, nodeUrl?: string) {
        const swarmFeed = new SwarmFeed(
            () => Promise.resolve(false),
            user,
            nodeUrl,
        );
        swarmFeed.initialize();

        return swarmFeed;
    }

    /**
     * Creates a new complete swarm feed
     * @param keypair 
     */
    public async getSwarmNodeClient(user: any, algorithm: AlgorithmTypeString = 'ES256K', nodeUrl?: string) {

        if (algorithm !== 'ES256K') throw new Error('Must be ES256K');
        const keypair = await this.getPrivateKey(algorithm);
        const swarmFeed = new SwarmFeed(
            async (data) => {
                if (this.onRequestPassphraseSubscriber.observers.length === 0) return sign(data, keypair);
                this.onRequestPassphraseSubscriber.next({ type: 'request_tx', payload: data, algorithm });
                // const signExternalP = new Promise((resolve, reject) => this.onSignExternal.next({ isDIDSigner: true, payload: data, next: resolve }));

                // const signExternal = await signExternalP;
                // if (signExternal.isEnabled) {
                //     return signExternal.signature;
                // }
                const canUseIt = await this.canUse();
                if (canUseIt) {
                    return sign(data, keypair);
                }

            },
            user,
            () => Promise.resolve(),
            nodeUrl
        );
        swarmFeed.initialize();
        return swarmFeed;
    }

    /**
     * Gets a public key from storage
     * @param id 
     * @param algorithm 
     */
    public async getPublicKey(id: string) {

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

        if ([AlgorithmType.P256_JWK_PUBLIC, AlgorithmType.RSA_JWK_PUBLIC, AlgorithmType.ED25519_JWK_PUBLIC,
        AlgorithmType.ES256K_JWK_PUBLIC].includes(AlgorithmType[algorithm])) {
            await this.db.put({
                _id: id,
                key: value
            });
        }
    }

    public async getImportKey(id: string) {

        const content = await this.db.get(id);
        return content;

    }


    /**
     * Sets a public key in storage
     * @param id 
     * @param algorithm 
     * @param value 
     */
    public async setImportKey(id: string, value: object) {

        await this.db.put({
            _id: id,
            key: value
        });
    }
    public async createWallet(password: string, mnemonic?: string) {
        const id = Buffer.from(ethers.utils.randomBytes(100)).toString('base64');

        if (mnemonic) {
            this.ethersWallet = ethers.Wallet.fromMnemonic(mnemonic);
        } else {
            this.ethersWallet = ethers.Wallet.createRandom();
            mnemonic = this.ethersWallet.mnemonic;
        }

        this.mnemonic = mnemonic


        let keystores: KeyStoreModel = {
            ED25519: '',
            ES256K: '',
            P256: '',
            RSA: '',
            BLS: '',
        }

        let keyExports: KeyStoreModel = {
            ED25519: '',
            ES256K: '',
            P256: '',
            RSA: '',
            BLS: '',
        }
        // ED25519
        let kp = this.getEd25519();
        keystores.ED25519 = kp.getSecret('hex');
        keyExports.ED25519 = await KeyConvert.getEd25519(kp);
        keyExports.ED25519.ldJsonPublic = await KeyConvert.createLinkedDataJsonFormat(
            LDCryptoTypes.Ed25519,
            kp,
            false);


        // ES256K
        kp = this.getES256K();
        keystores.ES256K = kp.getPrivate('hex');
        keyExports.ES256K = await KeyConvert.getES256K(kp);
        keyExports.ES256K.ldJsonPublic = await KeyConvert.createLinkedDataJsonFormat(
            LDCryptoTypes.JWK,
            // @ts-ignore
            { publicJwk: JSON.parse(keyExports.ES256K.ldSuite.publicKeyJwk) },
            false
        );

        // P256
        kp = this.getP256();
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
        keyExports.RSA = await KeyConvert.getRSA(kp);

        const keystoreMnemonicAsString = await this.ethersWallet.encrypt(password);

        const model: KeystoreDbModel = {
            _id: id,
            keypairs: keystores,
            keystoreSeed: keystoreMnemonicAsString,
            mnemonic: mnemonic,
            keypairExports: keyExports,

        }

        await this.db.crypto(password);
        await this.db.put(model);

        this.id = id;

        return this;
    }

    public async getPrivateKey(algorithm: AlgorithmTypeString): Promise<ec.KeyPair | eddsa.KeyPair> {


        const ks: KeystoreDbModel = await this.db.get(this.id);

        if (algorithm === 'ED25519') {
            const kp = new eddsa('ed25519');
            return kp.keyFromSecret(ks.keypairs.ED25519) as eddsa.KeyPair;
        } else if (algorithm === 'P256') {
            const kp = new ec('p256');
            return kp.keyFromPrivate(ks.keypairs.P256) as ec.KeyPair;
        } else if (algorithm === 'ES256K') {
            const kp = new ec('secp256k1');
            return kp.keyFromPrivate(ks.keypairs.ES256K) as ec.KeyPair;
        }

    }

    public async getPrivateKeyExports(algorithm: AlgorithmTypeString) {
        const ks: KeystoreDbModel = await this.db.get(this.id);
        return ks.keypairExports[algorithm];
    }

    public async canUse() {
        let ticket = null;
        const init = this.accepted;
        return new Promise((resolve) => {
            ticket = setInterval(() => {
                if (this.accepted !== init) {
                    clearInterval(ticket);
                    resolve(this.accepted);
                    this.accepted = undefined;
                    return;
                }
            }, 1000);
        });
    }


    public async signExternal() {
        return this.onSignExternal.toPromise();
    }


    /**
     * Signs with selected algorithm
     * @param algorithm Algorithm
     * @param payload Payload as buffer
     * @param options options
     */
    public async sign(algorithm: AlgorithmTypeString, payload: Buffer): Promise<[Error, any?]> {

        this.onRequestPassphraseSubscriber.next({ type: 'request_tx', payload, algorithm });

        const canUseIt = await this.canUse();


        if (canUseIt) {
            const key: ec.KeyPair | eddsa.KeyPair = await this.getPrivateKey(algorithm);
            return [null, key.sign(Buffer).toHex()];
        }
        return [new Error('invalid_passphrase')]
    }

    /**
     * Signs a JWT for single recipient
     * @param algorithm Algorithm
     * @param payload Payload as buffer
     * @param options options
     */
    public async signJWT(algorithm: AlgorithmTypeString, payload: any, options: any): Promise<[Error, any?]> {

        this.onRequestPassphraseSubscriber.next({ type: 'request_tx', payload, algorithm });

        const canUseIt = await this.canUse();


        if (canUseIt) {
            const { pem } = await this.getPrivateKeyExports(algorithm);
            return [null, await JWTService.sign(pem, payload, options)];
        }
        return [new Error('invalid_passphrase')]

    }

    public async signJWTFromPublic(publicKey: any, payload: any, options: any): Promise<[Error, any?]> {

        this.onRequestPassphraseSubscriber.next({ type: 'request_tx', payload });

        const canUseIt = await this.canUse();


        if (canUseIt) {
            return [null, JWTService.sign(publicKey, payload, options)];
        }

        return [new Error('invalid_passphrase')]
    }

    /**
     * Encrypts JWE
     * @param algorithm Algorithm 
     * @param payload Payload as buffer
     * @param overrideWithKey Uses this key instead of current wallet key
     * 
     */
    public async encryptJWE(algorithm: AlgorithmTypeString, payload: any, overrideWithKey: any): Promise<[Error, any?]> {

        this.onRequestPassphraseSubscriber.next({ type: 'request_tx', payload, algorithm });

        const canUseIt = await this.canUse();


        if (canUseIt) {
            let jwk;
            if (overrideWithKey === null) {
                const keys = await this.getPrivateKeyExports(algorithm);
                jwk = keys.jwk;
            }
            return [null, await JOSEService.encrypt([jwk], payload)];
        }
        return [new Error('invalid_passphrase')]

    }

    public async decryptJWE(algorithm: AlgorithmTypeString, payload: any): Promise<[Error, any?]> {

        this.onRequestPassphraseSubscriber.next({ type: 'request_tx', payload, algorithm });

        const canUseIt = await this.canUse();


        if (canUseIt) {
            const { jwk } = await this.getPrivateKeyExports(algorithm);

            return [null, await JWE.createDecrypt(
                await JWK.asKey(jwk, 'jwk')
            ).decrypt(payload)];
        }
        return [new Error('invalid_passphrase')]
    }
    /**
     * Encrypts JWE with multiple keys
     * @param algorithm 
     * @param payload 
     */
    public async encryptMultipleJWE(keys: any[], algorithm: AlgorithmTypeString, payload: any): Promise<[Error, any?]> {

        this.onRequestPassphraseSubscriber.next({ type: 'request_tx', payload, algorithm });

        const canUseIt = await this.canUse();


        if (canUseIt) {
            const { jwk } = await this.getPrivateKeyExports(algorithm);
            return [null, await JOSEService.encrypt([jwk, ...keys], payload)];
        }
        return [new Error('invalid_passphrase')]
    }
    /**
    * Generates a mnemonic
    */
    public static generateMnemonic() {
        return ethers.Wallet.createRandom().mnemonic;
    }

    public async open(id: string) {
        this.id = id;
        this.onRequestPassphraseSubscriber.next({ type: 'wallet' });
        this.onRequestPassphraseWallet.subscribe(async p => {
            if (p.type !== 'ui') {
                this.accepted = p.accepted;

            } else {
                try {
                    this.db.crypto(p.passphrase);
                    const ks = await this.db.get(id);
                    this.mnemonic = ks.mnemonic;
                    this.onRequestPassphraseSubscriber.next({ type: 'done' })
                } catch (e) {
                    this.onRequestPassphraseSubscriber.next({ type: 'error', error: e })
                }
            }
        });
    }


    /**
     * Derives a new child Wallet
     */
    public deriveChild(sequence: number, derivation = `m/44'/60'/0'/0`): string {

        const masterKey = HDNode.fromMnemonic(this.mnemonic);
        const hdnode = masterKey.derivePath(`${derivation}/${sequence}`);
        //    console.log(hdnode.path, hdnode.fingerprint, hdnode.parentFingerprint);
        const ethersWallet = new ethers.Wallet(hdnode);
        return ethersWallet.mnemonic;
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
    public deriveFromPath(path: string): string {

        const node = HDNode.fromMnemonic(this.mnemonic).derivePath(path);
        const ethersWallet = new ethers.Wallet(node);
        return ethersWallet.mnemonic;
    }

    public getEd25519(): eddsa.KeyPair {
        const ed25519 = new eddsa('ed25519');
        // const hdkey = HDKey.fromExtendedKey(HDNode.fromMnemonic(this.mnemonic).extendedKey);
        const { key } = getMasterKeyFromSeed(ethers.utils.HDNode.mnemonicToSeed(this.mnemonic));
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
