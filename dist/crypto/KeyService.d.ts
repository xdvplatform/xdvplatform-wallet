import { KeyModel } from './KeyModel';
export interface KeyService {
    generateKeys(mnemonic: string): Promise<{
        stores: KeyModel;
        exports: KeyModel;
    }>;
}
