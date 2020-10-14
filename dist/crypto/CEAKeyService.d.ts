import { KeyModel } from './KeyModel';
import { eddsa, ec } from 'elliptic';
import { JWK } from 'node-jose';
import { KeyService } from './KeyService';
export declare class CEAKeyService implements KeyService {
    getEd25519(mnemonic: string): eddsa.KeyPair;
    getP256(mnemonic: string): ec.KeyPair;
    getES256K(mnemonic: string): ec.KeyPair;
    getBlsMasterKey(mnemonic: string): any;
    getRSA256Standalone(len?: number): Promise<JWK.Key>;
    generateKeys(mnemonic: string): Promise<{
        stores: KeyModel;
        exports: KeyModel;
    }>;
}
