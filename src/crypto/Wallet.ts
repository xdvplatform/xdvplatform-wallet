import KeyEncoder from 'key-encoder';
import { ec, eddsa, } from 'elliptic';
import { HDKey } from 'ethereum-cryptography/hdkey';
import { ethers } from 'ethers';
import { HDNode } from 'ethers/utils';
import { getMasterKeyFromSeed, getPublicKey } from 'ed25519-hd-key';
import { HDKeyT } from 'ethereum-cryptography/pure/hdkey';
import { IsString, IsDefined, IsOptional } from 'class-validator';

export class WalletOptions {
    @IsString()
    @IsDefined()
    password: string;

    @IsOptional()
    @IsString()
    mnemonic?: string;
}

export class Wallet {


    constructor(private ethersWallet: ethers.Wallet) {

    }

    /**
     * Create HD Wallet
     * @param password password to encrypt keystore
     */
    public static async createHDWallet(obj: WalletOptions) {
        // ethers
        const { password, mnemonic } = obj;       
        let wallet;
        if (password) {
            wallet = ethers.Wallet.createRandom();
        } else {
            wallet = ethers.Wallet.fromMnemonic(mnemonic);
        }
        return await wallet.encrypt(password);
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
    public static async unlock(keystore: string, password: string) {
        const ethersWallet = await ethers.Wallet.fromEncryptedJson(keystore, password);
        return new Wallet(ethersWallet);
    }

    /**
     * Derives a new child Wallet
     */
    public deriveChild() {
        const hdkey = HDKey.fromExtendedKey(HDNode.fromMnemonic(this.ethersWallet.mnemonic).extendedKey);
        const childHD = hdkey.deriveChild(1);
        const ethersWallet = new ethers.Wallet(childHD.privateKey);
        return new Wallet(ethersWallet);
    }

    public getEd25519() {
        const ed25519 = new eddsa('ed25519');
        const hdkey = HDKey.fromExtendedKey(HDNode.fromMnemonic(this.ethersWallet.mnemonic).extendedKey);
        const { key, chainCode } = getMasterKeyFromSeed(ethers.utils.HDNode.mnemonicToSeed(this.ethersWallet.mnemonic));
        const keypair = ed25519.keyFromSecret(key as Buffer);
        return keypair;
    }

    public getPrivateKeyAsDER() {
        const encoderOptions = {
            curveParameters: [1, 3, 132, 0, 10],
            privatePEMOptions: { label: 'EC PRIVATE KEY' },
            publicPEMOptions: { label: 'PUBLIC KEY' },
            curve: new ec('secp256k1')
        }
        const keyEncoder = new KeyEncoder(encoderOptions);

        return keyEncoder.encodePrivate(this.ethersWallet.privateKey, 'raw', 'der');
    }


    public getPrivateKeyAsPEM() {
        const encoderOptions = {
            curveParameters: [1, 3, 132, 0, 10],
            privatePEMOptions: { label: 'EC PRIVATE KEY' },
            publicPEMOptions: { label: 'PUBLIC KEY' },
            curve: new ec('secp256k1')
        }
        const keyEncoder = new KeyEncoder(encoderOptions);

        return keyEncoder.encodePrivate(this.ethersWallet.privateKey, 'raw', 'pem');
    }
}
