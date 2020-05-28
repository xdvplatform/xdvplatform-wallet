import createIpid, { getDid } from 'did-ipid';
import { Wallet } from './Wallet';
import { expect } from 'chai';
import { JWTService } from './JWTService';
import { JOSEService } from './JOSEService';
import { KeyConvert } from './KeyConvert';
import { IpldClient } from './../ipld/IpldClient';
import { JWK } from 'jose';

const Resolver = require('did-resolver');

describe("#wallet", function () {
  let selectedWallet;
  beforeEach(function () {
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
      const pem = KeyConvert.getES256K(wallet.getES256K()).pem;
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
      const der = KeyConvert.getES256KAsDER(wallet.getES256K().getPrivate().toString());
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
        const pem = KeyConvert.getES256K(key).pem;
        const jwt = JWTService.signES256K(pem, {
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

    it("when signing with ES256K DID, should return a signed JWT", async function () {

      const mnemonic = Wallet.generateMnemonic();
      const opts = { mnemonic, password: '123password' };
      const keystore = await Wallet.createHDWallet(opts);
      expect(JSON.parse(keystore).version).equal(3);

      try {
        const wallet = await Wallet.unlock(keystore, opts.password);

        const kp = wallet.getES256K();
        const jwt = await JWTService.signES256KAsDID(kp, '0x4198258023eD0D6fae5DBCF3Af2aeDaaA363571F', {
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

    it("when signing with ES256K-R DID, should return a signed JWT", async function () {

      const mnemonic = Wallet.generateMnemonic();
      const opts = { mnemonic, password: '123password' };
      const keystore = await Wallet.createHDWallet(opts);
      expect(JSON.parse(keystore).version).equal(3);

      try {
        const wallet = await Wallet.unlock(keystore, opts.password);

        const kp = wallet.getP256();
        const jwt = await JWTService.signES256KRAsDID(kp, '0x4198258023eD0D6fae5DBCF3Af2aeDaaA363571F', {
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

    it("when signing with Ed25519 DID, should return a signed JWT", async function () {

      const mnemonic = Wallet.generateMnemonic();
      const opts = { mnemonic, password: '123password' };
      const keystore = await Wallet.createHDWallet(opts);
      expect(JSON.parse(keystore).version).equal(3);

      try {
        const wallet = await Wallet.unlock(keystore, opts.password);

        const kp = wallet.getEd25519();
        const jwt = await JWTService.signEd25519AsDID(kp, '0x4198258023eD0D6fae5DBCF3Af2aeDaaA363571F', {
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
        const kpJwk = KeyConvert.getP256(kp);

        // Signing
        const signed = await JWTService.signES256KRAsDID(kp, '0x4198258023eD0D6fae5DBCF3Af2aeDaaA363571F', {
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

        const encrypted = JOSEService.encrypt(kpJwk.jwk, signed);
        console.log(encrypted);

      }
      catch (e) {
        throw e;
      }
    });
  });

  describe("#decrypt/verify", function () {

    it(`when signing a secp256r1/P256 DID with a derived key and encrypting with JWE,
     should decrypt and verify`, async function () {

      const mnemonic = Wallet.generateMnemonic();
      const opts = { mnemonic, password: '123password' };
      const keystore = await Wallet.createHDWallet(opts);
      expect(JSON.parse(keystore).version).equal(3);

      try {
        // create ipld instance
        const ipld = new IpldClient();
        await ipld.initialize();

        // unlock wallet
        let wallet = await Wallet.unlock(keystore, opts.password);
        wallet = wallet.deriveChild(1);
        console.log(wallet.path);
        const path = wallet.path;

        // create new key pairs
        // const passphrase = 'password-to-store-pem-for-later-use';
        const kp = wallet.getP256();
        const kpJwk = KeyConvert.getP256(kp);


        // create did
        const rsaKey = await wallet.getRSA2048Standalone();
        const rsaPemJwk = KeyConvert.getRSA(rsaKey);
        // console.log(rsaPemJwk)
        const didFromGet = await ipld.getDID(rsaPemJwk.pem);
        console.log(didFromGet);
        const did = await ipld.createDID(rsaPemJwk.pem);

        // Signing
        const signed = await JWTService.signES256KRAsDID(kp, did, {
          testing: 'testing'
        }, {
          iat: (new Date(2020, 10, 10)).getTime(),
          iss: did,
          sub: 'document',
          aud: did,
          nbf: (new Date(2020, 10, 10)).getTime(),
        });
        // console.log(signed);
        expect(!!signed).equal(true)

        const encrypted = JOSEService.encrypt(kpJwk.jwk, signed);

        // get key from path
        wallet = wallet.deriveFromPath(path);
        const kpRestored = wallet.getP256();
        const kpJwkRestored = KeyConvert.getP256(kpRestored);

        // decrypt
        const plaintext = JOSEService.decrypt(kpJwkRestored.jwk, encrypted);
        console.log(`signed jwt: ${plaintext.toString()}`);

        // get ipld resolver
        const didIpld = await ipld.getIpidDidResolver();
        const res = new Resolver.Resolver(didIpld);
        ipld.setUniversalResolver(res);
        
        // verify
        const verified = await JWTService.didVerify(signed, {
          resolver: res,
          audience: did
        });
        console.log(`verified: ${verified}`);
        expect(signed).equal(plaintext.toString());

      }
      catch (e) {
        throw e;
      }
    });
  });
});
