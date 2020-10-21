import { KeyStorage } from '..';
import { KeyService } from '..';
import { Wallet } from './Wallet';
export interface WalletManager {
    getKeyService(): KeyService;
    getKeyStorage(): KeyStorage;
    createWallet(password: string, mnemonic: string): Promise<Wallet>;
    generateMnemonic(): string;
    unlockWallet(id: string, passphrase: string): Promise<Wallet>;
}
