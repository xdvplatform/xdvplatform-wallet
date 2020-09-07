import { KeyModel } from "./KeyModel";
import { eddsa, ec } from "elliptic";
import { getMasterKeyFromSeed } from "ed25519-hd-key";
import { ethers } from "ethers";
import { KeyConvert } from "./KeyConvert";
import { LDCryptoTypes } from "./LDCryptoTypes";
import { HDNode } from "ethers/utils";
import { JWK } from "node-jose";

export interface KeyService {
    generateKeys(mnemonic: string): Promise<{ stores: KeyModel, exports: KeyModel }>;
}

export class CEAKeyService implements KeyService {

    public async generateKeys(mnemonic: string): Promise<{ stores: KeyModel, exports: KeyModel }> {
        // ED25519 did
        const ed = new eddsa('ed25519');
        const { key } = getMasterKeyFromSeed(ethers.utils.HDNode.mnemonicToSeed(mnemonic));
        const edKeypair = ed.keyFromSecret(key);

        // ED25519 did
        const keyStoreED25519 = edKeypair.getSecret('hex');
        const keyExportED25519 = await KeyConvert.getEd25519(edKeypair);
        keyExportED25519.ldJsonPublic = KeyConvert.createLinkedDataJsonFormat(
            LDCryptoTypes.Ed25519,
            // @ts-ignore
            edKeypair,
            false);

        // ES256K blockchain
        const es256k = new ec('secp256k1');
        const es256kKeypair = es256k.keyFromPrivate(HDNode.fromMnemonic(mnemonic).privateKey);

        const keyStoreES256K = es256kKeypair.getPrivate('hex');
        const keyExportES256K = await KeyConvert.getES256K(es256kKeypair);
        keyExportES256K.ldJsonPublic = KeyConvert.createLinkedDataJsonFormat(
            LDCryptoTypes.JWK,
            // @ts-ignore
            { publicJwk: JSON.parse(keyExports.ES256K.ldSuite.publicKeyJwk) },
            false
        );

        // RSA for ipfs
        const rsaKeypair = await JWK.createKey('RSA', 2048, {
            alg: 'RS256',
            use: 'sig'
        });
        const keyStoreRSA = rsaKeypair.toJSON(true);
        const keyExportRSA = KeyConvert.getRSA(rsaKeypair);

        const stores: KeyModel = {
            ED25519: keyStoreED25519,
            ES256K: keyStoreES256K,
            P256: '',
            RSA: keyStoreRSA,
            BLS: '',
        }

        const exports: KeyModel = {
            ED25519: keyExportED25519,
            ES256K: keyExportES256K,
            P256: '',
            RSA: keyExportRSA,
            BLS: '',
        }

        return {
            stores,
            exports
        };

    }
}