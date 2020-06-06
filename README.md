# xdv-tools

## XDV Platform tools


`npm i xdvplatform-tools`

### Features

### crypto

- Supports for JWT, DID, JWE, XmlDsig, CMS (X509)
- Algorithms included: `secp256k1`, `secp256r1`, `ed25519`, `rsa` and upcoming `bls`
- `Keystore`, `HD Key`, `DER`, `JWK` and `PEM` support out of the box
- Support for output to `LD Crypto Suite` key pairs for `ecdsa` and `ed25519`
- More features planned like `bls` and `schnorr` for multi sig scenarios

#### API

####  Wallet

`Wallet.createHDWallet`

Creates a new random HD Wallet

```typescript
  const keystore = await Wallet.createHDWallet({ password: 'password123' });
```


`Wallet.generateMnemonic`

Creates a new mnemonic

```typescript
     const mnemonic = Wallet.generateMnemonic();
     const selectedWallet = await Wallet.createHDWallet({ mnemonic, password: '123password' });
```

`Wallet.unlock`

Unlocks an existing wallet

```typescript
      const wallet = await Wallet.unlock(selectedWallet, '123password');
```

`deriveChild`

Creates a new child HD Wallet

```typescript
      const child1 = wallet.deriveChild(1, `m/44'/60'/0'/0`);
      const child2 = wallet.deriveChild(2, `m/44'/60'/0'/0`);
      const child3 = wallet.deriveChild(3, `m/44'/60'/0'/0`);
```

`deriveFromPath`

Creates a new child HD Wallet

```typescript
      const child1 = wallet.deriveFromPath(`m/44'/60'/0'/0/1`);
      const child2 = wallet.deriveFromPath(`m/44'/60'/0'/0/2`);
      const child3 = wallet.deriveFromPath(`m/44'/60'/0'/0/3`);
```


`getEd25519`

Creates a new Ed25519 curve 

```typescript
    const mnemonic = Wallet.generateMnemonic();
    const opts = { mnemonic, password: '123password' };
    const keystore = await Wallet.createHDWallet(opts);
    const wallet = await Wallet.unlock(keystore, opts.password);
    const kp = await wallet.getEd25519();
```


`getP256`

Creates a new P256/secp256r1 curve 

```typescript
    const mnemonic = Wallet.generateMnemonic();
    const opts = { mnemonic, password: '123password' };
    const keystore = await Wallet.createHDWallet(opts);
    const wallet = await Wallet.unlock(keystore, opts.password);
    const kp = await wallet.getP256();
```


`getES256k`

Creates a new secp256k1 curve 

```typescript
    const mnemonic = Wallet.generateMnemonic();
    const opts = { mnemonic, password: '123password' };
    const keystore = await Wallet.createHDWallet(opts);
    const wallet = await Wallet.unlock(keystore, opts.password);
    const kp = await wallet.getES256k();
```


`getRSA256Standalone`

Creates a new RSA key pair. This key pair is not generated from HD Wallet seed. 

```typescript
    const mnemonic = Wallet.generateMnemonic();
    const opts = { mnemonic, password: '123password' };
    const keystore = await Wallet.createHDWallet(opts);
    const wallet = await Wallet.unlock(keystore, opts.password);
    const kp = await wallet.getRSA256Standalone();
```

`getBlsMasterKey`

Creates a new BLS key pair. Returns an object. 

```typescript
    const mnemonic = Wallet.generateMnemonic();
    const opts = { mnemonic, password: '123password' };
    const keystore = await Wallet.createHDWallet(opts);
    const wallet = await Wallet.unlock(keystore, opts.password);
    const kp = wallet.getBlsMasterKey();
    const deriveValidatorKey1 = await kp.deriveValidatorKeys(1);
```
####  KeyConvert

Handles key pair convertion from / to `PEM`, `DER` or `JWK`. Some algorithm also returns `JSON-LD` compatible exports.

`KeyConvert.getX509RSA`

Converts a RSA key pair. Available exports: JWK, PEM and LD.


```typescript
  const key = await Wallet.getRSA256Standalone();
        const issuer: X509Info = {
          stateOrProvinceName: 'PA',
          organizationName: 'RM',
          organizationalUnitName: 'Engineering',
          commonName: 'Rogelio Morrell',
          countryName: 'Panama',
          localityName: 'Panama'
        };
        const { jwk, pem } = await KeyConvert.getX509RSA(key);
        const jwt = await JWTService.sign(pem, {
          testing: 'testing'
        }, {
          iat: (new Date(2020, 10, 10)).getTime(),
          iss: '0x4198258023eD0D6fae5DBCF3Af2aeDaaA363571F',
          sub: 'document',
          aud: 'receptor',
          nbf: (new Date(2020, 10, 10)).getTime(),
        });

```

`KeyConvert.getP256`

Converts a P256 key pair. Available exports: JWK, DER, PEM and LD.


```typescript

    const mnemonic = Wallet.generateMnemonic();
    const opts = { mnemonic, password: '123password' };
    const keystore = await Wallet.createHDWallet(opts);
    expect(JSON.parse(keystore).version).equal(3);

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


```

`KeyConvert.getES256K`

Converts a ES256K key pair. Available exports: JWK, DER, PEM and LD.


```typescript
    const wallet = await Wallet.unlock(keystore, opts.password);
    const pem = (await KeyConvert.getES256K(wallet.getES256K())).pem;
```


`KeyConvert.getRSA`

Converts a RSA key pair. Available exports: JWK and PEM.


```typescript
   const key = await Wallet.getRSA256Standalone();
    const pem = (await KeyConvert.getRSA(key)).pem;
```

`KeyConvert.getEd25519`

Converts a Ed25519 key pair. Available exports: DER and PEM.


```typescript
    const mnemonic = Wallet.generateMnemonic();
    const opts = { mnemonic, password: '123password' };
    const keystore = await Wallet.createHDWallet(opts);

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

```

`KeyConvert.createLinkedDataJsonFormat`

Creates a Linked Data suite json format from a LD Suite export.

```typescript
    const mnemonic = Wallet.generateMnemonic();
    const opts = { mnemonic, password: '123password' };
    const keystore = await Wallet.createHDWallet(opts);

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
    
```

####  JWTService

Signs and verifies JWT.

`JWTService.decodeWithSignature`

Decodes a JWT


```typescript
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
```

`JWTService.sign`

Signs a JWT


```typescript
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
```

`JWTService.verify`

Verifies a JWT


```typescript
    // get document with a CID and DID
    const resolver = await xdvMethod.getResolver(localStorage['recentlyStoreCID']);
    const doc = await resolver.xdv(localStorage['recentlyStoreDID']);

    // unlock wallet
    let wallet = await Wallet.unlock(localStorage['ks'], localStorage['ps']);

    // create new key pairs
    const kp = wallet.getP256();
    const kpJwk = await KeyConvert.getP256(kp);


    // decrypt
    const obj = await JOSEService.decrypt(kpJwk.jwk, doc.encrypted);
    const verified = await JWTService.verify(kpJwk.pem,(<Buffer> obj.plaintext).toString('utf8'), 'receptor');
```


####  JOSEService

Encrypts and decrypts JWT.

`JOSEService.encrypt`

Encrypts a string or buffer payload


```typescript
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

    // Encrypt JWT
    const encrypted = await JOSEService.encrypt(kpJwk.jwk, signed);
```

`JOSEService.decrypt`

Decrypts a cipher


```typescript
    // get document with a CID and DID
    const resolver = await xdvMethod.getResolver(localStorage['recentlyStoreCID']);
    const doc = await resolver.xdv(localStorage['recentlyStoreDID']);

    // unlock wallet
    let wallet = await Wallet.unlock(localStorage['ks'], localStorage['ps']);

    // create new key pairs
    const kp = wallet.getP256();
    const kpJwk = await KeyConvert.getP256(kp);


    // decrypt
    const obj = await JOSEService.decrypt(kpJwk.jwk, doc.encrypted);
    const verified = await JWTService.verify(kpJwk.pem,(<Buffer> obj.plaintext).toString('utf8'), 'receptor');


```


####  X509

`X509.createSelfSignedCertificateFromRSA`


Creates a self sign certificate from a RSA key pair

```typescript
    const issuer: X509Info = {
        stateOrProvinceName: 'PA',
        organizationName: 'RM',
        organizationalUnitName: 'Engineering',
        commonName: 'Rogelio Morrell',
        countryName: 'Panama',
        localityName: 'Panama'
    };
    const rsaKey = await Wallet.getRSA256Standalone();

    const rsaKeyExports = await KeyConvert.getX509RSA(rsaKey);
    const selfSignedCert = X509.createSelfSignedCertificateFromRSA(rsaKeyExports.pem, issuer);
    const signedDocuments = await XmlDsig.signFEDocument(rsaKeyExports.pem, selfSignedCert, latestFEDocument);
```


####  XmlDsig (FE specific)

Signs FE XML Documents

`XmlDsig.signFEDocument`

Signs a Factura Electronica de Panama document

```typescript
    const issuer: X509Info = {
        stateOrProvinceName: 'PA',
        organizationName: 'RM',
        organizationalUnitName: 'Engineering',
        commonName: 'Rogelio Morrell',
        countryName: 'Panama',
        localityName: 'Panama'
    };
    const rsaKey = await Wallet.getRSA256Standalone();

    const rsaKeyExports = await KeyConvert.getX509RSA(rsaKey);
    const selfSignedCert = X509.createSelfSignedCertificateFromRSA(rsaKeyExports.pem, issuer);
    const signedDocuments = await XmlDsig.signFEDocument(rsaKeyExports.pem, selfSignedCert, latestFEDocument);
```

####  CMSSigner

Signs CMS Documents

`CMSSigner.sign`

Signs a CMS document

```typescript
    const issuer: X509Info = {
        stateOrProvinceName: 'PA',
        organizationName: 'RM',
        organizationalUnitName: 'Engineering',
        commonName: 'Rogelio Morrell',
        countryName: 'Panama',
        localityName: 'Panama'
    };
    const rsaKey = await Wallet.getRSA256Standalone();

    const rsaKeyExports = await KeyConvert.getX509RSA(rsaKey);
    const selfSignedCert = X509.createSelfSignedCertificateFromRSA(rsaKeyExports.pem, issuer);
    const res = CMSSigner.sign(selfSignedCert,
        rsaKeyExports.pem,
        fs.readFileSync(__dirname + '/fixtures/cms.pdf'));
```

#### `did`

- Supports for basic DID JSON schemas
- `DID JWT` signing and validation using `xdvplatform-tools/crypto` API
- Includes `did-method-xdv` with resolver

#### API

####  DIDMethodXDV - XDV DID Method

XDV DID method is based on IPLD. Before using it,  it needs to be initialize. After initializing, generate
a new session key (the DID key) and then use `DIDDocumentBuilder` to create a DID document.

`Usage`

```typescript
    const ipld = new IpldClient();
    const xdvMethod = new DIDMethodXDV(ipld);


    // create ipld instance
    await ipld.initialize();

    // ....

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


    // Always store DID in IPLD
    cid = await ipld.createNode({
        ...did,
    });

```

Resolving is a different, you'll ned both CID and DID.

```typescript
    // get document with a CID and DID
    const resolver = await xdvMethod.getResolver(cid);
    const doc = await resolver.xdv(did);

```



`Wallet.createHDWallet`

Creates a new random HD Wallet

```typescript
  const keystore = await Wallet.createHDWallet({ password: 'password123' });
```



#### `fe`

- Includes most of the API specifications for `Factura Electronica DGI Panama` up to September 2018 specification
- Planned features: `CUFE` generation and `QR` generation

#### `ipld`

- IPLD client

#### `storage`

- XDV storage schemas for IPLD


#### `comm`

- IPNS PubSub


#### `dv`

- Digito Verificador for RUC Natural Person based on algorithm from Registro Publico de Panama. 
- Client that calls a read only function in a Solidity smart contract

##### Usage

```typescript
        const nodeUrl = '...node url';
        const isMainnet = true;
        const account = '...your ethereum accpunt';

        const dv = new DV(account, nodeUrl, isMainnet);
        
        // initialize contracts
        await dv.initialize();
        
        // call calculate
        // input is 
        // { type, segments 1 to  4}
        // For more information, visit https://dv.auth2factor.com
        const resp = await dv.calculate(CedulaInputTypes.N,
            [0, 8],
            [0, 0],
            [7, 1, 3],
            [2, 2, 3]);

        expect(resp).equals('11');
```

@molekilla, Rogelio Morrell C. 
Copyright 2020

##### MIT License
