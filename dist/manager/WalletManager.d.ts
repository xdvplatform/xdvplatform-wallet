import { KeyStorage } from '..';
import { KeyService } from '..';
import { KeyStorageModel } from '../key-storage/KeyStorageModel';
export interface WalletManager {
    getKeyService(): KeyService;
    getKeyStorage(): KeyStorage;
    createWallet(password: string, mnemonic: string): Promise<KeyStorageModel>;
    generateMnemonic(): string;
    unlockWallet(id: string, passphrase: string): Promise<KeyStorageModel>;
    getWalletAddress(mnemonic: string): string;
}
