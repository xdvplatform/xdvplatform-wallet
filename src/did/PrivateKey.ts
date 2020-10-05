import { PublicKey } from './PublicKey';
import { Authentication } from './Authentication';
export class PrivateKey {
	constructor() {}

	public toAuthorizationKey() {
		return <Authentication>{
			publicKey: this.publicKeyBase58,
			type: this.type
		};
	}
	public toPublicKey() {
		return <PublicKey>{
			publicKeyBase58: this.publicKeyBase58,
			type: this.type,
			owner: this.owner
		};
	}
	owner?: string;

	id: string;
	type: string;

	publicKeyBase64?: string;
	publicKeyBase58?: string;

	publicKeyHex?: string;
	publicKeyPem?: string;

	privateKeyBase64?: string;

	privateKeyBase58?: string;

	privateKeyHex?: string;

	privateKeyPem?: string;
}
