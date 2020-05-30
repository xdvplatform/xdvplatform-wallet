import { TextEncoder } from 'util';

const forge = require("node-forge");
const ab2str = require("arraybuffer-to-string");
const arrayBufferConcat = require("arraybuffer-concat");

function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export class PKCS7Utils {
  public static signDetachedPdf(
    cert: Uint8Array,
    pvk: Uint8Array,
    pdf: Uint8Array
  ) {
    const pki = forge.pki;
    const privateKey = forge.pki.privateKeyFromPem(ab2str(pvk));
    const certificate = forge.  pki.certificateFromPem(ab2str(cert));

    // create PKCS#7 signed data with authenticatedAttributes
    // attributes include: PKCS#9 content-type, message-digest, and signing-time
    var p7 = forge.pkcs7.createSignedData();
    p7.content = forge.util.createBuffer(pdf, "binary");
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
    p7.sign({ detached: true });

    const raw = forge.asn1.toDer(p7.toAsn1()).getBytes();
    const signed = arrayBufferConcat(raw, pdf);
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
