import { KeyModel } from './KeyModel';
import { eddsa, ec } from 'elliptic';
import { getMasterKeyFromSeed } from 'ed25519-hd-key';
import { ethers } from 'ethers';
import { KeyConvert } from './KeyConvert';
import { LDCryptoTypes } from './LDCryptoTypes';
import { HDNode } from 'ethers/utils';
import { JWK } from 'node-jose';
import {
	deriveKeyFromMnemonic,
	deriveEth2ValidatorKeys
} from '@chainsafe/bls-keygen';

export interface KeyService {
	generateKeys(
		mnemonic: string
	): Promise<{ stores: KeyModel; exports: KeyModel }>;
}

export class CEAKeyService implements KeyService {
	public getEd25519(mnemonic: string): eddsa.KeyPair {
		const ed = new eddsa('ed25519');
		const { key } = getMasterKeyFromSeed(
			ethers.utils.HDNode.mnemonicToSeed(mnemonic)
		);
		return ed.keyFromSecret(key);
	}

	public getP256(mnemonic: string): ec.KeyPair {
		const p256 = new ec('p256');
		return p256.keyFromPrivate(HDNode.fromMnemonic(mnemonic).privateKey);
	}

	public getES256K(mnemonic: string): ec.KeyPair {
		const ES256k = new ec('secp256k1');
		return ES256k.keyFromPrivate(HDNode.fromMnemonic(mnemonic).privateKey);
	}

	public getBlsMasterKey(mnemonic: string): any {
		const masterKey = deriveKeyFromMnemonic(mnemonic);
		return {
			deriveValidatorKeys: (id: number) =>
				deriveEth2ValidatorKeys(masterKey, id)
		};
	}

	public getRSA256Standalone(len: number = 2048): Promise<JWK.Key> {
		return JWK.createKey('RSA', len, {
			alg: 'RS256',
			use: 'sig'
		});
	}

	public async generateKeys(
		mnemonic: string
	): Promise<{ stores: KeyModel; exports: KeyModel }> {
		// ED25519 did
		const edKeypair = this.getEd25519(mnemonic);

		// ED25519 did
		const keyStoreED25519 = edKeypair.getSecret('hex');
		const keyExportED25519 = await KeyConvert.getEd25519(edKeypair);
		keyExportED25519.ldJsonPublic = KeyConvert.createLinkedDataJsonFormat(
			LDCryptoTypes.Ed25519,
			// @ts-ignore
			edKeypair,
			false
		);

		// ES256K blockchain
		const es256kKeypair = this.getES256K(mnemonic);

		const keyStoreES256K = es256kKeypair.getPrivate('hex');
		const keyExportES256K = await KeyConvert.getES256K(es256kKeypair);
		keyExportES256K.ldJsonPublic = KeyConvert.createLinkedDataJsonFormat(
			LDCryptoTypes.JWK,
			// @ts-ignore
			{ publicJwk: JSON.parse(keyExports.ES256K.ldSuite.publicKeyJwk) },
			false
		);

		// RSA for ipfs
		const rsaKeypair = await this.getRSA256Standalone();
		const keyStoreRSA = rsaKeypair.toJSON(true);
		const keyExportRSA = KeyConvert.getRSA(rsaKeypair);

		const stores: KeyModel = {
			ED25519: keyStoreED25519,
			ES256K: keyStoreES256K,
			P256: '',
			RSA: keyStoreRSA,
			BLS: ''
		};

		const exports: KeyModel = {
			ED25519: keyExportED25519,
			ES256K: keyExportES256K,
			P256: '',
			RSA: keyExportRSA,
			BLS: ''
		};

		return {
			stores,
			exports
		};
	}
}
