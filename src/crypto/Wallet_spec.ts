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
  let selectedWallet: Wallet;
  before(async function () {

    // create ipld instance
    await ipld.initialize();

  });

  it("when adding a password for a new wallet, should create a keystore", async function () {
    const wallet = new Wallet();
    await wallet.createWallet('123password',    Promise.resolve('123password'))
    expect(!!wallet.id).equal(true);
  });


  it("when adding a password and keystore for a new wallet, should create keystore", async function () {
    const mnemonic = Wallet.generateMnemonic();
    const wallet = new Wallet();
    selectedWallet = await wallet.createWallet('123password', Promise.resolve('123password'), mnemonic);
    expect(selectedWallet.mnemonic).equal(mnemonic);
  });

  


  it("when given a seed and creating EdDSA keys, should return EdDSA keypair", async function () {


    try {
      const kp = await selectedWallet.getEd25519();
      expect(!!kp).equal(true);
    }
    catch (e) {
      throw e;
    }
  });

  it("when given a seed and creating P256 keys, should return P256 keypair", async function () {

    
    try {
      const kp = await selectedWallet.getP256();
      expect(!!kp).equal(true);
    }
    catch (e) {
      throw e;
    }
  });

  it("when given a seed, should return a PEM", async function () {

    try {
      const pem = (await KeyConvert.getES256K(selectedWallet.getES256K())).pem;
      expect(!!pem).equal(true);
    }
    catch (e) {
      throw e;
    }
  });


  it("when given a seed, should return a DER", async function () {


    try {
      const der = await KeyConvert.getES256K(selectedWallet.getES256K());
      expect(!!der).equal(true);
    }
    catch (e) {
      throw e;
    }
  });

  describe("#signing", function () {

    it("when signing with ES256K, should return a signed JWT", async function () {

      try {
          const { pem } = await selectedWallet.getPrivateKeyExports('ES256K');
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


      try {
          const { pem } = await selectedWallet.getPrivateKeyExports('P256');
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

      try {
          const { pem } = await selectedWallet.getPrivateKeyExports('ED25519');

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

      try {
          const { pem, ldJsonPublic } = await selectedWallet.getPrivateKeyExports('P256');
        // Create IPFS key storage lock
        const session = await xdvMethod.createIpldSession(pem);

        // Create DID document with an did-ipid based issuer
        const did = await DIDDocumentBuilder
          .createDID({
            issuer: session.key,
            verificationKeys: [{...ldJsonPublic}],
            authenticationKeys: [{...ldJsonPublic}]
          });

        // Signing
        const signed = await selectedWallet.signJWT('P256', {
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

        const encrypted = await selectedWallet.encryptJWE('P256', signed);
        expect(!!encrypted).equals(true)

      }
      catch (e) {
        throw e;
      }
    });
  });
  xdescribe("#ipld", function () {

    it("when signing a secp256r1/P256 DID and encrypting with JWE, should store in ipld", async function () {

     
      try {
        // Unlock wallet

        // Create key
        const kp = selectedWallet.getP256();
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
        const encrypted = await JOSEService.encrypt([kpJwk.jwk], signed);
        // Stored decoded and encrypted
        localStorage['recentlyStoreCID'] = await ipld.createNode({
          ...did,
          encrypted
        });

     
     
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


  xdescribe("#decrypt/verify", function () {

    it(`when signing a secp256r1/P256 DID with a derived key and encrypting with JWE,
     should decrypt and verify`, async function () {

      try {
        // get document with a CID and DID
        const resolver = await xdvMethod.getResolver(localStorage['recentlyStoreCID']);
        const doc = await resolver.xdv(localStorage['recentlyStoreDID']);

        
        // create new key pairs
        // const passphrase = 'password-to-store-pem-for-later-use';
        const kp = selectedWallet.getP256();
        const kpJwk = await KeyConvert.getP256(kp);


        // decrypt
        const obj = await JOSEService.decrypt(kpJwk.jwk, doc.encrypted);
        console.log((obj.plaintext.toString('utf8')))
        const verified = await JWTService.verify(kpJwk.pem, (<Buffer>obj.plaintext).toString('utf8'), 'receptor');
        expect(!!verified.id).equals(true);
      }
      catch (e) {
        throw e;
      }
    });
  });
});
