# xdv-tools

## XDV Platform tools


`npm i xdvplatform-tools`

### Features

#### `crypto`

- Supports for JWT, DID, JWE, XmlDsig, CMS (X509)
- Algorithms included: `secp256k1`, `secp256r1`, `ed25519`, `rsa` and upcoming `bls`
- `Keystore`, `HD Key`, `DER`, `JWK` and `PEM` support out of the box
- Support for output to `LD Crypto Suite` key pairs for `ecdsa` and `ed25519`
- More features planned like `bls` and `schnorr` for multi sig scenarios

#### `did`

- Supports for basic DID JSON schemas
- `DID JWT` signing and validation using `xdvplatform-tools/crypto` API
- Includes `did-method-xdv` with resolver

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
