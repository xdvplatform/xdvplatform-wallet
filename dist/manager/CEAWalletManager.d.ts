import { WalletManager } from './WalletManager';
import { Wallet } from './Wallet';
import { KeyService } from '../crypto';
import { KeyStorage } from '../key-storage';
export declare class CEAWalletManager implements WalletManager {
    private keyService;
    private keyStorage;
    constructor(keyService: KeyService, keyStorage: KeyStorage);
    createWallet(password: string, mnemonic: string): Promise<Wallet>;
    generateMnemonic(): string;
    unlockWallet(id: string, passphrase: string): Promise<Wallet>;
}
