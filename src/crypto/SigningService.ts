import { JWTPayload } from '.';
import { AlgorithmType } from './AlgorithmType';

export interface SigningService {
	/**
	 * Signs with selected algorithm
	 * @param algorithm Algorithm
	 * @param payload Payload as buffer
	 */
	sign(algorithm: AlgorithmType, payload: Buffer): Promise<any>;

	/**
	 * Signs a JWT for single recipient
	 * @param algorithm Algorithm
	 * @param payload Payload as buffer
	 * @param options options
	 */
	signJWT(
		algorithm: AlgorithmType,
		payload: Buffer,
		options: JWTPayload
	): Promise<any>;

	signJWTFromPublic(
		publicKey: any,
		payload: any,
		options: JWTPayload
	): Promise<string>;

	/**
	 * Encrypts JWE
	 * @param algorithm Algorithm
	 * @param payload Payload as buffer
	 *
	 */
	encryptJWE(algorithm: AlgorithmType, payload: any): Promise<any>;

	encryptMultipleJWE(
		keys: any[],
		algorithm: AlgorithmType,
		payload: any
	): Promise<any>;

	decryptJWE(algorithm: AlgorithmType, payload: any): Promise<any>;
}
