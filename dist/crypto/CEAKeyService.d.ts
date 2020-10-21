import { KeyModel } from './KeyModel';
import { AlgorithmType } from './AlgorithmType';
import { KeyService } from './KeyService';
export declare class CEAKeyService implements KeyService {
    getPrivateKey(algorithm: AlgorithmType, keyStore: KeyModel): string;
    private getEd25519;
    private getP256;
    private getES256K;
    private getBlsMasterKey;
    private getRSA256Standalone;
    generateKeys(mnemonic: string): Promise<{
        stores: KeyModel;
        exports: KeyModel;
    }>;
}
