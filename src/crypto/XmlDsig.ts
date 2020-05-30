import crypto from 'crypto'
import { SignedXml } from 'web-xml-crypto';
import { JWK } from 'jose';
import * as forge from 'node-forge'
import { create } from 'xmlbuilder2';

function KeyInfoProvider(pem: string) {

    function getSubjectName(certObj) {
        var subjectFields,
            fields = ['CN', 'OU', 'O', 'L', 'ST', 'C'];

        if (certObj.subject) {
            subjectFields = fields.reduce(function (subjects, fieldName) {
                var certAttr = certObj.subject.getField(fieldName);

                if (certAttr) {
                    subjects.push(fieldName + '=' + certAttr.value);
                }

                return subjects;
            }, []);
        }

        return Array.isArray(subjectFields) ? subjectFields.join(',') : '';
    }

    this._certificatePEM = pem;
    this.getKeyInfo = function (key, prefix) {
        const base64cert = forge.util.encode64(forge.pem.decode(this._certificatePEM)[0].body);
        const certObj = forge.pki.certificateFromPem(this._certificatePEM);
        prefix = prefix || '';
        prefix = prefix ? prefix + ':' : prefix;
        const cert = `<${prefix}X509Certificate>${base64cert}</${prefix}X509Certificate>`;
        return `<${prefix}X509Data><${prefix}X509SubjectName>${getSubjectName(certObj)}</${prefix}X509SubjectName>${cert}</${prefix}X509Data>`;

    };

    this.getKey = function () {
        return this._certificatePEM;
    };
}


export class XmlDsig {
    /**
     * Signs a FE DGI invoice documentt
     * @param signingKey Signing Key, PEM generated from a RSA key
     * @param selfSignedCert Certification generated from a RSA key
     * @param document An XML documents
     */
    public static signFEDocument(signingKey: string, selfSignedCert: string, document: string) {
        const sig = new SignedXml()
        sig.addReference("//*[local-name(.)='rFE']", ['http://www.w3.org/2001/10/xml-exc-c14n#',
            'http://www.w3.org/2000/09/xmldsig#enveloped-signature',]
            , 'http://www.w3.org/2001/04/xmlenc#sha256', "", "", "", true)
        sig.canonicalizationAlgorithm = 'http://www.w3.org/2001/10/xml-exc-c14n#';
        sig.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
        sig.signingKey = signingKey;
        sig.keyInfoProvider = new KeyInfoProvider(selfSignedCert)
        sig.computeSignature(document)
        const output = sig.signedXml;
        let feSigned = create(output).end({ format: 'object' });

        return { xml: output, json: feSigned };
    }
}