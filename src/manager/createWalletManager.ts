import { CEAWalletManager, WalletManager } from '.';
import { CEAKeyService, KeyService } from '../crypto';
import { KeyStorage, PouchdbKeyStorage } from '../key-storage';
import PouchDB from 'pouchdb';

export const createWalletManager = (): WalletManager => {
	const keyService: KeyService = new CEAKeyService();
	const storage: KeyStorage = new PouchdbKeyStorage(new PouchDB('PAID'));
	return new CEAWalletManager(keyService, storage);
};
