import { DIDDocumentBuilder } from '../did/DIDDocumentBuilder';
import { DIDMethodXDV } from '../did/DIDMethodXDV';
import { ethers } from 'ethers';
import { expect } from 'chai';
import { IpldClient } from './../ipld/IpldClient';
import { JOSEService } from './JOSEService';
import { JWTService } from './JWTService';
import { KeyConvert, X509Info } from './KeyConvert';
import { LDCryptoTypes } from './LDCryptoTypes';
import { Wallet } from './Wallet';
let localStorage = {};
const ipld = new IpldClient();
const xdvMethod = new DIDMethodXDV(ipld);

describe("#wallet", function () {
  let selectedWallet;
  before(async function () {

    // create ipld instance
    await ipld.initialize();

  });

  it("when adding a password for a new wallet, should create a keystore", async function () {
    const keystore = await Wallet.createHDWallet({ password: 'password123' });
    expect(JSON.parse(keystore).version).equal(3);
  });


  it("when adding a password and keystore for a new wallet, should create keystore", async function () {
    const mnemonic = Wallet.generateMnemonic();
    selectedWallet = await Wallet.createHDWallet({ mnemonic, password: '123password' });
    expect(JSON.parse(selectedWallet).version).equal(3);
  });

  it("when given a keystore and password, should unlock and return a wallet", async () => {

    try {
      const wallet = await Wallet.unlock(selectedWallet, '123password');
      expect(true).equal(true);
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  });

  it("when given a seed and creating EdDSA keys, should return EdDSA keypair", async function () {

    const mnemonic = Wallet.generateMnemonic();
    const opts = { mnemonic, password: '123password' };
    const keystore = await Wallet.createHDWallet(opts);
    expect(JSON.parse(keystore).version).equal(3);

    try {
      const wallet = await Wallet.unlock(keystore, opts.password);
      const kp = await wallet.getEd25519();
      expect(!!kp).equal(true);
    }
    catch (e) {
      throw e;
    }
  });

  it("when given a seed and creating P256 keys, should return P256 keypair", async function () {

    const mnemonic = Wallet.generateMnemonic();
    const opts = { mnemonic, password: '123password' };
    const keystore = await Wallet.createHDWallet(opts);
    expect(JSON.parse(keystore).version).equal(3);

    try {
      const wallet = await Wallet.unlock(keystore, opts.password);
      const kp = await wallet.getP256();
      expect(!!kp).equal(true);
    }
    catch (e) {
      throw e;
    }
  });

  it("when given a seed, should return a PEM", async function () {

    const mnemonic = Wallet.generateMnemonic();
    const opts = { mnemonic, password: '123password' };
    const keystore = await Wallet.createHDWallet(opts);
    expect(JSON.parse(keystore).version).equal(3);

    try {
      const wallet = await Wallet.unlock(keystore, opts.password);
      const pem = (await KeyConvert.getES256K(wallet.getES256K())).pem;
      expect(!!pem).equal(true);
    }
    catch (e) {
      throw e;
    }
  });


  it("when given a seed, should return a DER", async function () {

    const mnemonic = Wallet.generateMnemonic();
    const opts = { mnemonic, password: '123password' };
    const keystore = await Wallet.createHDWallet(opts);
    expect(JSON.parse(keystore).version).equal(3);

    try {
      const wallet = await Wallet.unlock(keystore, opts.password);
      const der = await KeyConvert.getES256K(wallet.getES256K());
      expect(!!der).equal(true);
    }
    catch (e) {
      throw e;
    }
  });

  describe("#signing", function () {

    it("when signing with ES256K, should return a signed JWT", async function () {

      const mnemonic = Wallet.generateMnemonic();
      const opts = { mnemonic, password: '123password' };
      const keystore = await Wallet.createHDWallet(opts);
      expect(JSON.parse(keystore).version).equal(3);

      try {
        const wallet = await Wallet.unlock(keystore, opts.password);
        const key = wallet.getES256K();
        const pem = (await KeyConvert.getES256K(key)).pem;
        const jwt = await JWTService.sign(pem, {
          testing: 'testing'
        }, {
          iat: (new Date(2020, 10, 10)).getTime(),
          iss: '0x4198258023eD0D6fae5DBCF3Af2aeDaaA363571F',
          sub: 'document',
          aud: 'receptor',
          nbf: (new Date(2020, 10, 10)).getTime(),
        });

        expect(!!jwt).equal(true)
      }
      catch (e) {
        throw e;
      }
    });

    it("when signing with RSA, should return a signed JWT", async function () {


      try {
        const key = await await Wallet.getRSA256Standalone();
        const issuer: X509Info = {
          stateOrProvinceName: 'PA',
          organizationName: 'RM',
          organizationalUnitName: 'Engineering',
          commonName: 'Rogelio Morrell',
          countryName: 'Panama',
          localityName: 'Panama'
        };
        const { jwk, pemAsPrivate } = await KeyConvert.getX509RSA(key);
        const jwt = await JWTService.sign(pemAsPrivate, {
          testing: 'testing'
        }, {
          iat: (new Date(2020, 10, 10)).getTime(),
          iss: '0x4198258023eD0D6fae5DBCF3Af2aeDaaA363571F',
          sub: 'document',
          aud: 'receptor',
          nbf: (new Date(2020, 10, 10)).getTime(),
        });

        expect(!!jwt).equal(true)
      }
      catch (e) {
        throw e;
      }
    });

    it("when signing with P256, should return a signed JWT", async function () {

      const mnemonic = Wallet.generateMnemonic();
      const opts = { mnemonic, password: '123password' };
      const keystore = await Wallet.createHDWallet(opts);
      expect(JSON.parse(keystore).version).equal(3);

      try {
        const wallet = await Wallet.unlock(keystore, opts.password);
        const key = wallet.getP256();

        const pem = (await KeyConvert.getP256(key)).pem;
        const jwt = await JWTService.sign(pem, {
          testing: 'testing'
        }, {
          iat: (new Date(2020, 10, 10)).getTime(),
          iss: '0x4198258023eD0D6fae5DBCF3Af2aeDaaA363571F',
          sub: 'document',
          aud: 'receptor',
          nbf: (new Date(2020, 10, 10)).getTime(),
        });

        expect(!!jwt).equal(true)
      }
      catch (e) {
        throw e;
      }
    });

    it("when signing with Ed25519, should return a signed JWT", async function () {

      const mnemonic = Wallet.generateMnemonic();
      const opts = { mnemonic, password: '123password' };
      const keystore = await Wallet.createHDWallet(opts);
      expect(JSON.parse(keystore).version).equal(3);

      try {
        const wallet = await Wallet.unlock(keystore, opts.password);
        const key = wallet.getEd25519();

        const pem = (await KeyConvert.getEd25519(key)).pem;
        const jwt = await JWTService.sign(pem, {
          testing: 'testing'
        }, {
          iat: (new Date(2020, 10, 10)).getTime(),
          iss: '0x4198258023eD0D6fae5DBCF3Af2aeDaaA363571F',
          sub: 'document',
          aud: 'receptor',
          nbf: (new Date(2020, 10, 10)).getTime(),
        });

        expect(!!jwt).equal(true)
      }
      catch (e) {
        throw e;
      }
    });


  });
  describe("#encryption", function () {

    it("when signing a secp256r1/P256 DID and encrypting with JWE, should return a cipher", async function () {

      const mnemonic = Wallet.generateMnemonic();
      const opts = { mnemonic, password: '123password' };
      const keystore = await Wallet.createHDWallet(opts);
      expect(JSON.parse(keystore).version).equal(3);

      try {
        const wallet = await Wallet.unlock(keystore, opts.password);

        const kp = wallet.getP256();
        const kpJwk = await KeyConvert.getP256(kp);

        // Create LD Crypto Suite - p256 / Sepc256r1
        const ldCrypto = await KeyConvert
          .createLinkedDataJsonFormat(LDCryptoTypes.Sepc256r1, kpJwk.ldSuite);

        // Create IPFS key storage lock
        const session = await xdvMethod.createIpldSession(kpJwk.pem);

        // Create DID document with an did-ipid based issuer
        const did = await DIDDocumentBuilder
          .createDID({
            issuer: session.key,
            verificationKeys: [ldCrypto.toPublicKey()],
            authenticationKeys: [ldCrypto.toAuthorizationKey()]
          });

        // Signing
        const signed = await  JWTService.sign(kpJwk.pem, {
          ...did,
          testing: 'testing'
        }, {
          iat: (new Date(2020, 10, 10)).getTime(),
          iss: '0x4198258023eD0D6fae5DBCF3Af2aeDaaA363571F',
          sub: 'document',
          aud: 'receptor',
          nbf: (new Date(2020, 10, 10)).getTime(),
        });
        // console.log(signed);
        expect(!!signed).equal(true)

        const encrypted = await JOSEService.encrypt(kpJwk.jwk, signed);
        expect(!!encrypted).equals(true)

      }
      catch (e) {
        throw e;
      }
    });
  });
  describe("#ipld", function () {

    it("when signing a secp256r1/P256 DID and encrypting with JWE, should store in ipld", async function () {

      const mnemonic = Wallet.generateMnemonic();
      const opts = { mnemonic, password: '123password' };
      const keystore = await Wallet.createHDWallet(opts);
      expect(JSON.parse(keystore).version).equal(3);

      try {
        // Unlock wallet
        const wallet = await Wallet.unlock(keystore, opts.password);

        // Create key
        const kp = wallet.getP256();
        const kpJwk = await KeyConvert.getP256(kp);

        // Create LD Crypto Suite - p256 / Sepc256r1
        const ldCrypto = await KeyConvert
          .createLinkedDataJsonFormat(LDCryptoTypes.Sepc256r1, kpJwk.ldSuite);

        // Create DID id from PEM keypair and store it variable  
        const session = await xdvMethod.createIpldSession(kpJwk.pem);

        // Set DID
        localStorage['recentlyStoreDID'] = session.key;

        // Create DID document with an did-ipid based issuer
        let did = await DIDDocumentBuilder
          .createDID({
            issuer: session.key,
            verificationKeys: [ldCrypto.toPublicKey()],
            authenticationKeys: [ldCrypto.toAuthorizationKey()]
          });

        // Sign as JWT
        let signed = await JWTService.sign(kpJwk.pem, {
          ...did,
          testing: 'testing'
        }, {
          iat: (new Date(2020, 10, 10)).getTime(),
          iss: '0x4198258023eD0D6fae5DBCF3Af2aeDaaA363571F',
          sub: 'document',
          aud: 'receptor',
          nbf: (new Date(2020, 10, 10)).getTime(),
        });

        // Decoded
        const decoded = await JWTService.decodeWithSignature(signed);
        expect(!!decoded.signature).equal(true)
        expect(!!decoded.data).equal(true)
        expect(!!decoded.header).equal(true)
        expect(!!decoded.payload).equal(true)
        // console.log await(JWTService.decodeWithSignature(signed));

        // Encrypt JWT
        const encrypted = await JOSEService.encrypt(kpJwk.jwk, signed);
        // Stored decoded and encrypted
        localStorage['recentlyStoreCID'] = await ipld.createNode({
          ...did,
          encrypted
        });

        // Store Keystore
        localStorage['ps'] = opts.password;
        localStorage['ks'] = keystore;
        expect(!!localStorage['recentlyStoreDID']).equals(true);
      }
      catch (e) {
        console.log(e);
        throw e;
      }
    });


    it("when stored in ipld, should fetch recently saved ipld node", async function () {
      console.log(`Fetching ${localStorage['recentlyStoreCID']}...`)
      const node = await ipld.getNode(localStorage['recentlyStoreCID'], '/');
      expect(!!node.value.id).equals(true)
    });


    it("when stored in ipld, should fetch and resolve ipld node", async function () {
      console.log(`Fetching ${localStorage['recentlyStoreCID']}...`)
      const resolver = await xdvMethod.getResolver(localStorage['recentlyStoreCID']);
      const doc = await resolver.xdv(localStorage['recentlyStoreDID']);

    });
  });


  describe("#decrypt/verify", function () {

    it(`when signing a secp256r1/P256 DID with a derived key and encrypting with JWE,
     should decrypt and verify`, async function () {

      try {
        // get document with a CID and DID
        const resolver = await xdvMethod.getResolver(localStorage['recentlyStoreCID']);
        const doc = await resolver.xdv(localStorage['recentlyStoreDID']);

        // unlock wallet
        let wallet = await Wallet.unlock(localStorage['ks'], localStorage['ps']);

        // create new key pairs
        // const passphrase = 'password-to-store-pem-for-later-use';
        const kp = wallet.getP256();
        const kpJwk = await KeyConvert.getP256(kp);


        // decrypt
        const obj = await JOSEService.decrypt(kpJwk.jwk, doc.encrypted);
console.log((obj.plaintext.toString('utf8')))
        const verified = await JWTService.verify(kpJwk.pem,(<Buffer> obj.plaintext).toString('utf8'), 'receptor');
        expect(!!verified.id).equals(true);
      }
      catch (e) {
        throw e;
      }
    });
  });
});
