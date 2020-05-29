# xdv-tools

## XDV Platform tools


`npm i xdvplatform-tools`

### Features

#### `xdvplatform-tools/crypto`

- Supports for JWT, DID, JWE
- Algorithms included: `secp256k1`, `secp256r1`, `ed25519`, `rsa` and upcoming `bls`
- `Keystore`, `HD Key`, `DER`, `JWK` and `PEM` support out of the box
- Support for output to `LD Crypto Suite` key pairs for `ecdsa` and `ed25519`
- More features planned like `bls` and `schnorr` for multi sig scenarios
- Planned feature includes `xmldsig` and `pkcs#7/X509` signing

#### `xdvplatform-tools/did`

- Supports for basic DID JSON schemas
- `DID JWT` signing and validation using `xdvplatform-tools/crypto` API
- Includes `did-method-xdv` with resolver

#### `xdvplatform-tools/fe`

- Includes most of the API specifications for `Factura Electronica DGI Panama` up to September 2018 specification
- Planned features: `CUFE` generation and `QR` generation

#### `xdvplatform-tools/ipld`

- IPLD client

#### `xdvplatform-tools/storage`

- XDV storage schemas for IPLD

@molekilla, Rogelio Morrell C. 
Copyright 2020 May

##### MIT License
