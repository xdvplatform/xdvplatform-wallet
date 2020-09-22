/// <reference types="node" />
/// <reference types="pouchdb-core" />
import { JWTPayload } from '.';
import { AlgorithmType } from './AlgorithmType';
export interface SigningService {
    sign(algorithm: AlgorithmType, payload: Buffer): Promise<any>;
    signJWT(algorithm: AlgorithmType, payload: Buffer, options: JWTPayload): Promise<any>;
    signJWTFromPublic(publicKey: any, payload: any, options: JWTPayload): Promise<string>;
    encryptJWE(algorithm: AlgorithmType, payload: any): Promise<any>;
    encryptMultipleJWE(keys: any[], algorithm: AlgorithmType, payload: any): Promise<any>;
    decryptJWE(algorithm: AlgorithmType, payload: any): Promise<any>;
}
