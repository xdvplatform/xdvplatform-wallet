import { TextEncoder } from 'util';

const forge = require("node-forge");

const arrayBufferConcat = require("arraybuffer-concat");


export class CMSSigner {
  public static sign(
    pemCertificate: string,
    signingKey: string,
    content: Uint8Array,
    detached: boolean = true
  ) {
    const privateKey = forge.pki.privateKeyFromPem(signingKey);
    const certificate = forge.  pki.certificateFromPem(pemCertificate);

    // create PKCS#7 signed data with authenticatedAttributes
    // attributes include: PKCS#9 content-type, message-digest, and signing-time
    var p7 = forge.pkcs7.createSignedData();
    p7.content = forge.util.createBuffer(content, "binary");
    p7.addCertificate(certificate);
    p7.addSigner({
      key: privateKey,
      certificate,
      digestAlgorithm: forge.pki.oids.sha256,
      authenticatedAttributes: [
        {
          type: forge.pki.oids.contentType,
          value: forge.pki.oids.data
        },
        {
          type: forge.pki.oids.messageDigest
          // value will be auto-populated at signing time
        },
        {
          type: forge.pki.oids.signingTime,
          // value can also be auto-populated at signing time
          value: new Date()
        }
      ]
    });
    p7.sign();

    const pem = forge.pkcs7.messageToPem(p7);

    // PKCS#7 Sign in detached mode.
    // Includes the signature and certificate without the signed data.
    p7.sign({ detached });

    const raw = forge.asn1.toDer(p7.toAsn1()).getBytes();
    const signed = arrayBufferConcat(raw, content);
    return { pem: new TextEncoder().encode(pem), signed };
  }

  static buf2hex(buffer) {
    // buffer is an ArrayBuffer
    return Array.prototype.map
      .call(new Uint8Array(buffer), x => ("00" + x.toString(16)).slice(-2))
      .join("");
  }

  static validatePEM(cert: Uint8Array, pvk: Uint8Array, pem: Uint8Array) {
    return true;
  }
}
