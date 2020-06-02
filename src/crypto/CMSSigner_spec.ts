import { expect } from 'chai';



import { XmlDsig, Wallet, KeyConvert, X509, CMSSigner, X509Info } from '../crypto';
const SignedXml = require('web-xml-crypto').SignedXml
    , fs = require('fs')

describe("#cms", function () {

    beforeEach(function () {
    });

    it("should be able to sign with RSA Key pair", async function () {
        const issuer: X509Info = {
            stateOrProvinceName: 'PA',
            organizationName: 'RM',
            organizationalUnitName: 'Engineering',
            commonName: 'Rogelio Morrell',
            countryName: 'Panama',
            localityName: 'Panama'
        };
        const rsaKey = await await Wallet.getRSA256Standalone();

        const rsaKeyExports = await KeyConvert.getX509RSA(rsaKey, issuer, issuer);
        const selfSignedCert = X509.createSelfSignedCertificateFromRSA(rsaKeyExports.pem);
        try {
            const res = CMSSigner.sign(selfSignedCert,
                rsaKeyExports.pem,
                fs.readFileSync(__dirname + '/fixtures/cms.pdf'));
            expect(!!res.signed).equals(true);
        } catch (e) {
            console.log(e);
        }
    });
});
