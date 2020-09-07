export interface Wallet {
    _id: string;
    address: string;
    mnemonic: string;
    path: string;
    privateKey: string;
    created: Date;
}