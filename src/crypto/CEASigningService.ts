import { ec, eddsa } from 'elliptic';
import { JWTPayload } from '.';
import { KeyStorageModel } from '../key-storage/KeyStorageModel';
import { AlgorithmType, AlgorithmTypeString } from './AlgorithmType';
import { SigningService } from './SigningService';
import jsonwebtoken from 'jsonwebtoken';
import { JWE, JWK } from 'node-jose';

export class CEASigningService implements SigningService {
	private currentKeyStorage: KeyStorageModel;

	useKeyStorage(keyStorage: KeyStorageModel): SigningService {
		this.currentKeyStorage = keyStorage;
		return this;
	}

	private validateKeyStorage() {
		if (!this.currentKeyStorage) {
			throw new Error(
				'No current Key Storage found, please call useKeyStorage() method first.'
			);
		}
	}

	sign<T extends eddsa.KeyPair | ec.KeyPair>(
		algorithm: AlgorithmType,
		payload: Buffer
	): ec.Signature | eddsa.Signature {
		let kp: ec | eddsa;
		let key: eddsa.KeyPair | ec.KeyPair;
		this.validateKeyStorage();
		switch (algorithm) {
			case AlgorithmType.ED25519:
				kp = new eddsa('ed25519');
				key = kp.keyFromSecret(this.currentKeyStorage.keypairs.ED25519) as T;
				break;
			case AlgorithmType.ES256K:
				kp = new ec('p256');
				key = kp.keyFromPrivate(this.currentKeyStorage.keypairs.P256) as T;
				break;
			case AlgorithmType.P256:
				kp = new ec('secp256k1');
				key = kp.keyFromPrivate(this.currentKeyStorage.keypairs.ES256K) as T;
				break;
			default:
				throw new Error('AlgorithmType not supported.');
		}
		return key.sign(payload);
	}

	signJWT(
		algorithm: AlgorithmTypeString,
		payload: Buffer,
		options: JWTPayload
	): string {
		this.validateKeyStorage();
		const { pem } = this.currentKeyStorage.keypairExports[algorithm];
		return jsonwebtoken.sign(payload, pem, {
			audience: options.aud,
			issuer: options.iss,
			subject: options.sub
		});
	}

	signJWTFromPublic(publicKey: any, payload: any, options: JWTPayload): string {
		this.validateKeyStorage();
		return jsonwebtoken.sign(payload, publicKey, {
			audience: options.aud,
			issuer: options.iss,
			subject: options.sub
		});
	}

	encryptJWE(algorithm: AlgorithmType, payload: any): Promise<string> {
		this.validateKeyStorage();
		const { jwk } = this.currentKeyStorage.keypairExports[algorithm];
		return JWE.createEncrypt([...jwk])
			.update(payload)
			.final();
	}

	async decryptJWE(
		algorithm: AlgorithmType,
		payload: any
	): Promise<JWE.DecryptResult> {
		this.validateKeyStorage();
		// TODO: validate param type 'jwk' instead of private
		const { jwk } = this.currentKeyStorage.keypairExports[algorithm];
		const key = await (JWK as any).asKey(jwk, 'jwk');
		return await JWE.createDecrypt(key).decrypt(payload);
	}

	/**
	 * Verifies a signed message
	 * @param key buffer
	 * @param signature Signature
	 */
	verify(key: any, signature: any): string | object {
		return jsonwebtoken.verify(signature, key, { algorithms: ['HS256'] });
	}
}
