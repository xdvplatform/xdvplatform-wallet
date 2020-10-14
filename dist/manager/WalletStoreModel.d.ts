import { KeyModel } from "../crypto/KeyModel";
export interface WalletStoreModel {
    _id: any;
    keypairs: KeyModel;
    keystoreSeed: any;
    mnemonic: string;
    keypairExports: KeyModel;
    publicKeys?: any;
}
