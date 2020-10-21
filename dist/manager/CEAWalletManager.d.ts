import { WalletManager } from './WalletManager';
import { Wallet } from './Wallet';
import { KeyService } from '../crypto';
import { KeyStorage } from '../key-storage';
export declare class CEAWalletManager implements WalletManager {
    private _keyService;
    private _keyStorage;
    constructor(_keyService: KeyService, _keyStorage: KeyStorage);
    getKeyService(): KeyService;
    getKeyStorage(): KeyStorage;
    createWallet(password: string, mnemonic: string): Promise<Wallet>;
    generateMnemonic(): string;
    unlockWallet(id: string, passphrase: string): Promise<Wallet>;
}
