import {
    CMSSigner,
    KeyConvert,
    Wallet,
    X509,
    X509Info,
    XmlDsig
    } from '../crypto';
import { expect } from 'chai';



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

        const rsaKeyExports = await KeyConvert.getX509RSA(rsaKey);
        const selfSignedCert = X509.createSelfSignedCertificateFromRSA(
            rsaKeyExports.pemAsPrivate, rsaKeyExports.pemAsPublic, issuer);
        try {
            const res = CMSSigner.sign(selfSignedCert,
                rsaKeyExports.pemAsPrivate,
                fs.readFileSync(__dirname + '/fixtures/cms.pdf'));
            expect(!!res.signed).equals(true);
        } catch (e) {
            console.log(e);
        }
    });
});
