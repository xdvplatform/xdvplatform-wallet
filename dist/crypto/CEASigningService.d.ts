/// <reference types="node" />
/// <reference types="pouchdb-core" />
import { ec, eddsa } from 'elliptic';
import { JWTPayload } from '.';
import { KeyStorageModel } from '../key-storage/KeyStorageModel';
import { AlgorithmType, AlgorithmTypeString } from './AlgorithmType';
import { SigningService } from './SigningService';
import { JWE } from 'node-jose';
export declare class CEASigningService implements SigningService {
    private currentKeyStorage;
    useKeyStorage(keyStorage: KeyStorageModel): SigningService;
    private validateKeyStorage;
    sign<T extends eddsa.KeyPair | ec.KeyPair>(algorithm: AlgorithmType, payload: Buffer): ec.Signature | eddsa.Signature;
    signJWT(algorithm: AlgorithmTypeString, payload: Buffer, options: JWTPayload): string;
    signJWTFromPublic(publicKey: any, payload: any, options: JWTPayload): string;
    encryptJWE(algorithm: AlgorithmType, payload: any): Promise<string>;
    decryptJWE(algorithm: AlgorithmType, payload: any): Promise<JWE.DecryptResult>;
    verify(key: any, signature: any): string | object;
}
