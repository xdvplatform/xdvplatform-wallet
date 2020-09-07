import { Wallet } from "./Wallet";

export interface WalletManager {
    createWallet(password: string, mnemonic: string): Promise<Wallet>;
    generateMnemonic(): string;
    unlockWallet(id: string, passphrase: string): Promise<Wallet>;
}