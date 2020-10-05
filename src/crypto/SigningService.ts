import { ec, eddsa } from 'elliptic';
import { JWE } from 'node-jose';
import { JWTPayload } from '.';
import { KeyStorageModel } from '../key-storage/KeyStorageModel';
import { AlgorithmType, AlgorithmTypeString } from './AlgorithmType';

export interface SigningService {
	useKeyStorage(keyStorage: KeyStorageModel): SigningService;

	/**
	 * Signs with selected algorithm
	 * @param algorithm Algorithm
	 * @param payload Payload as buffer
	 */
	sign<T extends eddsa.KeyPair | ec.KeyPair>(
		algorithm: AlgorithmType,
		payload: Buffer
	): string;

	/**
	 * Signs a JWT for single recipient
	 * @param algorithm Algorithm
	 * @param payload Payload as buffer
	 * @param options options
	 */
	signJWT(
		algorithm: AlgorithmTypeString,
		payload: Buffer,
		options: JWTPayload
	): string;

	signJWTFromPublic(publicKey: any, payload: any, options: JWTPayload): string;

	/**
	 * Encrypts JWE
	 * @param algorithm Algorithm
	 * @param payload Payload as buffer
	 *
	 */
	encryptJWE(algorithm: AlgorithmType, payload: any): Promise<string>;

	decryptJWE(
		algorithm: AlgorithmType,
		payload: any
	): Promise<JWE.DecryptResult>;

	/**
	 * Verifies a signed message
	 * @param key buffer
	 * @param signature Signature
	 */
	verify(key: any, signature: any): string | object;
}
