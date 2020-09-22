import { JWK, JWE } from 'node-jose';

export class KeyRecipient {
	header: any;
	key: JWK.Key;
}
// protected: { enc: alg // A128GCM }
export class JOSEService {
	public static DEFAULT_PROTECTED = {
		alg: 'ECDH-ES',
		enc: 'A128CBC-HS256'
	};
	public static DEFAULT_UNPROTECTED = { cty: 'text/plain' };
	constructor() {}

	/**
	 * Encrypts payload with JWK key
	 * @param key JWK key
	 * @param payload String or Buffer payload
	 */
	public static encrypt(keys: JWK.Key[], payload: string | Buffer) {
		return JWE.createEncrypt([...keys])
			.update(payload)
			.final();
	}

	/**
	 * Decrypts a JWE cipher
	 * @param key JWK Key
	 * @param ciphertext Encrypted content
	 */
	public static async decrypt(
		key: any,
		jwe: string
	): Promise<JWE.DecryptResult> {
		return await JWE.createDecrypt(await JWK.asKey(key, 'pem')).decrypt(jwe);
	}

	// /**
	//  * Encrypts payload with multiple JWK keys
	//  * @param recipients JWK keys
	//  * @param payload String or Buffer payload
	//  */
	// public static encryptMultiple(recipients: KeyRecipient[], payload: string | Buffer) {
	//     const encryptor = new JWE.Encrypt(payload, JOSEService.DEFAULT_PROTECTED, JOSEService.DEFAULT_UNPROTECTED);
	//     recipients.map(key => encryptor.recipient(key.key, key.header));
	//     return encryptor.encrypt('general');
	// }
}
