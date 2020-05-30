"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = exports.WalletOptions = void 0;
const elliptic_1 = require("elliptic");
const hdkey_1 = require("ethereum-cryptography/hdkey");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/utils");
const ed25519_hd_key_1 = require("ed25519-hd-key");
const class_validator_1 = require("class-validator");
const jose_1 = require("jose");
const bls_keygen_1 = require("@chainsafe/bls-keygen");
let WalletOptions = /** @class */ (() => {
    class WalletOptions {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined()
    ], WalletOptions.prototype, "password", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], WalletOptions.prototype, "mnemonic", void 0);
    return WalletOptions;
})();
exports.WalletOptions = WalletOptions;
class Wallet {
    constructor(ethersWallet) {
        this.ethersWallet = ethersWallet;
    }
    /**
     * Create HD Wallet
     * @param password password to encrypt keystore
     */
    static createHDWallet(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            // ethers
            const { password, mnemonic } = obj;
            let wallet;
            if (password) {
                wallet = ethers_1.ethers.Wallet.createRandom();
            }
            else {
                wallet = ethers_1.ethers.Wallet.fromMnemonic(mnemonic);
            }
            return yield wallet.encrypt(password);
        });
    }
    /**
     * Generates a mnemonic
     */
    static generateMnemonic() {
        return ethers_1.ethers.Wallet.createRandom().mnemonic;
    }
    /**
     * Unlocks a JSON keystore
     * @param keystore A JSON keystore
     * @param password password to decrypt
     */
    static unlock(keystore, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const ethersWallet = yield ethers_1.ethers.Wallet.fromEncryptedJson(keystore, password);
            return new Wallet(ethersWallet);
        });
    }
    /**
     * Derives a new child Wallet
     */
    deriveChild(sequence, derivation = `m/44'/60'/0'/0`) {
        const masterKey = utils_1.HDNode.fromMnemonic(this.ethersWallet.mnemonic);
        const hdnode = masterKey.derivePath(`${derivation}/${sequence}`);
        const ethersWallet = new ethers_1.ethers.Wallet(hdnode);
        return new Wallet(ethersWallet);
    }
    get path() {
        return this.ethersWallet.path;
    }
    get address() {
        return this.ethersWallet.getAddress();
    }
    /**
     * Derives a wallet from a path
     */
    deriveFromPath(path) {
        const node = utils_1.HDNode.fromMnemonic(this.ethersWallet.mnemonic).derivePath(path);
        const ethersWallet = new ethers_1.ethers.Wallet(node);
        return new Wallet(ethersWallet);
    }
    getEd25519() {
        const ed25519 = new elliptic_1.eddsa('ed25519');
        // const hdkey = HDKey.fromExtendedKey(HDNode.fromMnemonic(this.ethersWallet.mnemonic).extendedKey);
        const { key, chainCode } = ed25519_hd_key_1.getMasterKeyFromSeed(ethers_1.ethers.utils.HDNode.mnemonicToSeed(this.ethersWallet.mnemonic));
        const keypair = ed25519.keyFromSecret(key);
        return keypair;
    }
    getP256() {
        const { HDKey } = require('hdkey-secp256r1');
        const p256 = new elliptic_1.ec('p256');
        // const hdkey = HDKey.fromExtendedKey(HDNode.fromMnemonic(this.ethersWallet.mnemonic).extendedKey);
        const key = HDKey.fromMasterSeed(Buffer.from(utils_1.HDNode.mnemonicToSeed(this.ethersWallet.mnemonic), 'hex'));
        const keypair = p256.keyFromPrivate(key.privateKey);
        return keypair;
    }
    getES256K() {
        const ES256k = new elliptic_1.ec('secp256k1');
        const key = hdkey_1.HDKey.fromMasterSeed(Buffer.from(utils_1.HDNode.mnemonicToSeed(this.ethersWallet.mnemonic), 'hex'));
        const keypair = ES256k.keyFromPrivate(key.privateKey);
        return keypair;
    }
    getBlsMasterKey() {
        const masterKey = bls_keygen_1.deriveKeyFromMnemonic(this.ethersWallet.mnemonic);
        return {
            deriveValidatorKeys: (id) => bls_keygen_1.deriveEth2ValidatorKeys(masterKey, id)
        };
    }
    getRSA2048Standalone() {
        return jose_1.JWK.generate("RSA");
    }
}
exports.Wallet = Wallet;
//# sourceMappingURL=Wallet.js.map