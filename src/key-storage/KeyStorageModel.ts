import { KeyModel } from '../crypto';

export interface KeyStorageModel {
	_id: string;
	keypairs: KeyModel;
	keystoreSeed: string;
	mnemonic: string;
	keypairExports: KeyModel;
	created: Date;
}
