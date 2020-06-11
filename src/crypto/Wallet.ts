import { ethers } from 'ethers';
import { getMasterKeyFromSeed, getPublicKey } from 'ed25519-hd-key';
import { HDKey } from 'ethereum-cryptography/hdkey';
import { HDNode } from 'ethers/utils';
import { IsDefined, IsOptional, IsString } from 'class-validator';
import { JWK } from 'node-jose';
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
export class Wallet {
    private inMemoryKeystore: IMemKeyStore;
    private secureStore: ISecureStore;

    constructor(private mnemonic: string, private ethersWallet: ethers.Wallet) {
    }

    public createWebSecureWallet(inMemoryKeystore: IMemKeyStore, secureStore: ISecureStore) {
        return Object.assign(this, {
            inMemoryKeystore,
            secureStore
        })
    }
    public async getPublicKey(id: string, algorithm: string) {
        return this.getPrivateKey(id, algorithm, '');
    }

    public async getPrivateKey(id: string, algorithm: string, password?: string) {
        let pvk = '';
        let key = id + algorithm;
        if (this.inMemoryKeystore && this.inMemoryKeystore.get(key)) {
            pvk = this.inMemoryKeystore.get(key);
        } else {

            // Read value
            pvk = await this.secureStore.getSecureValue(key);
        }
        this.inMemoryKeystore.set(key, pvk);
        if (AlgorithmType[algorithm] === AlgorithmType.ES256K) {
            const ES256k = new ec('secp256k1');
            return ES256k.keyFromPrivate(pvk);
        }

        if (AlgorithmType[algorithm] === AlgorithmType.P256) {
            const P256 = new ec('P256');
            return P256.keyFromPrivate(pvk);
        }

        if (AlgorithmType[algorithm] === AlgorithmType.ED25519) {
            const ED25519 = new eddsa('ed25519');
            return ED25519.keyFromSecret(pvk);
        }
        if ([AlgorithmType.P256_JWK_PUBLIC, AlgorithmType.RSA_JWK_PUBLIC, AlgorithmType.ED25519_JWK_PUBLIC,
            AlgorithmType.ES256K_JWK_PUBLIC].includes(AlgorithmType[algorithm])) {
            return await JWK.asKey(JSON.parse(pvk), 'jwk');
        }
    }


     setSecure(id: string, algorithm: AlgorithmTypeString, value: string) {
        const key = id + algorithm;
        // Write value
        return this.secureStore.writeSecureValue(key, value);
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

    static async browserUnlock(keystore: any, password: string) {
        try {
            const base = await ethers.Wallet.fromEncryptedJson(
                keystore,
                password
            );
            return new Wallet(base.mnemonic, base);
        } catch (e) {
            console.log(e);
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
