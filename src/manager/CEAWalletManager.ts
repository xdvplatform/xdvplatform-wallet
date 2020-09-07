import { WalletManager } from "./WalletManager";
import { Wallet } from "./Wallet";
import { ethers } from "ethers";
import { KeyService } from "../crypto";
import { KeyStorage } from "../key-storage";
import { KeyStorageModel } from "../key-storage/KeyStorageModel";

export class CEAWalletManager implements WalletManager {

    constructor(private keyService: KeyService,
        private keyStorage: KeyStorage) {
    }

    async createWallet(password: string, mnemonic: string): Promise<Wallet> {
        if (!ethers.utils.HDNode.isValidMnemonic(mnemonic)) {
            throw new Error('The Mnemonic is not valid.');
        }

        const wallet = ethers.Wallet.fromMnemonic(mnemonic);

        const keystoreMnemonicAsString = await wallet.encrypt(password);
        const { stores, exports } = await this.keyService.generateKeys(mnemonic);
        const _id = Buffer.from(ethers.utils.randomBytes(100)).toString('base64');

        const model: KeyStorageModel = {
            _id,
            keypairs: stores,
            keystoreSeed: keystoreMnemonicAsString,
            mnemonic: mnemonic,
            keypairExports: exports,
            created: new Date()
        }

        await this.keyStorage.enableCrypto(password);
        const result = await this.keyStorage.save(model);
        if (!result.ok) {
            throw new Error('Wallet not saved to storage.');
        }

        const { address, path, privateKey } = wallet;
        return {
            _id,
            address,
            mnemonic: mnemonic,
            path,
            privateKey,
            created: model.created
        };
    }

    generateMnemonic(): string {
        return ethers.Wallet.createRandom().mnemonic;
    }

    async unlockWallet(id: string, passphrase: string): Promise<Wallet> {
        try {
            await this.keyStorage.enableCrypto(passphrase);
            const ks = await this.keyStorage.find<KeyStorageModel>(id);
            const wallet = ethers.Wallet.fromMnemonic(ks.mnemonic);
            const { address, path, privateKey, mnemonic } = wallet;
            return {
                _id: id,
                address,
                mnemonic,
                path,
                privateKey,
                created: ks.created
            };
        } catch (e) {
            return null;
        }
    }

}