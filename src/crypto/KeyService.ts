import { AlgorithmType } from '.';
import { KeyModel } from './KeyModel';

export interface KeyService {
	getPrivateKey(algorithm: AlgorithmType, keyStore: KeyModel): string;

	generateKeys(
		mnemonic: string
	): Promise<{ stores: KeyModel; exports: KeyModel }>;
}
