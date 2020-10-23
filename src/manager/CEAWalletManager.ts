import { WalletManager } from './WalletManager';
import { ethers } from 'ethers';
import { KeyService } from '../crypto';
import { KeyStorage } from '../key-storage';
import { KeyStorageModel } from '../key-storage/KeyStorageModel';

export class CEAWalletManager implements WalletManager {
	constructor(
		private _keyService: KeyService,
		private _keyStorage: KeyStorage
	) {}

	public getKeyService() {
		return this._keyService;
	}

	public getKeyStorage() {
		return this._keyStorage;
	}

	async createWallet(
		password: string,
		mnemonic: string
	): Promise<KeyStorageModel> {
		if (!ethers.utils.HDNode.isValidMnemonic(mnemonic)) {
			throw new Error('The Mnemonic is not valid.');
		}

		const wallet = ethers.Wallet.fromMnemonic(mnemonic);

		const keystoreSeed = await wallet.encrypt(password);
		const { stores, exports } = await this._keyService.generateKeys(mnemonic);
		const _id = Buffer.from(ethers.utils.randomBytes(100)).toString('base64');

		const ks: KeyStorageModel = {
			_id,
			keypairs: stores,
			keystoreSeed,
			mnemonic,
			keypairExports: exports,
			created: new Date()
		};

		await this._keyStorage.enableCrypto(password);
		const result = await this._keyStorage.save(ks);
		if (!result.ok) {
			throw new Error('Wallet not saved to storage.');
		}
		return ks;
	}

	generateMnemonic(): string {
		return ethers.Wallet.createRandom().mnemonic;
	}

	async unlockWallet(id: string, passphrase: string): Promise<KeyStorageModel> {
		try {
			await this._keyStorage.enableCrypto(passphrase);
			return await this._keyStorage.find<KeyStorageModel>(id);
		} catch (e) {
			return null;
		}
	}

	getWalletAddress(mnemonic: string): string {
		const wallet = ethers.Wallet.fromMnemonic(mnemonic);
		const { address } = wallet;
		return address;
	}
}
