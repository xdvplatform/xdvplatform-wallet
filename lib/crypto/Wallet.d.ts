import { ec, eddsa } from 'elliptic';
import { ethers } from 'ethers';
import { JWK } from 'jose';
export declare class WalletOptions {
    password: string;
    mnemonic?: string;
}
export declare class Wallet {
    private ethersWallet;
    constructor(ethersWallet: ethers.Wallet);
    /**
     * Create HD Wallet
     * @param password password to encrypt keystore
     */
    static createHDWallet(obj: WalletOptions): Promise<any>;
    /**
     * Generates a mnemonic
     */
    static generateMnemonic(): string;
    /**
     * Unlocks a JSON keystore
     * @param keystore A JSON keystore
     * @param password password to decrypt
     */
    static unlock(keystore: string, password: string): Wallet;
    /**
     * Derives a new child Wallet
     */
    deriveChild(sequence: number, derivation?: string): Wallet;
    get path(): string;
    get address(): Promise<string>;
    /**
     * Derives a wallet from a path
     */
    deriveFromPath(path: string): Wallet;
    getEd25519(): eddsa.KeyPair;
    getP256(): ec.KeyPair;
    getES256K(): ec.KeyPair;
    getBlsMasterKey(): any;
    getRSA2048Standalone(): Promise<JWK.RSAKey>;
}
