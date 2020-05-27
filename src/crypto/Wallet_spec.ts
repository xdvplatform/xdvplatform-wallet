import { Wallet } from './Wallet';
import { expect } from 'chai';
import  { JWTSigner } from './JWTSigner';

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

  it("when given a keystore and password, should unlock and return a wallet", async  ()=> {

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
      const pem = await wallet.getES256KAsPEM();
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
      const der = await wallet.getES256KAsDER();
      expect(!!der).equal(true);
    }
    catch (e) {
      throw e;
    }
  });


  it("when signing with ES256K, should return a signed JWT", async function () {

    const mnemonic = Wallet.generateMnemonic();
    const opts = { mnemonic, password: '123password' };
    const keystore = await Wallet.createHDWallet(opts);
    expect(JSON.parse(keystore).version).equal(3);

    try {
      const wallet = await Wallet.unlock(keystore, opts.password);

      const signer = new JWTSigner(wallet);
      const jwt = signer.signES256K({
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

      const signer = new JWTSigner(wallet);
      const jwt = await signer.signES256KAsDID('0x4198258023eD0D6fae5DBCF3Af2aeDaaA363571F', {
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
