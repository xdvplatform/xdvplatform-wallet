import { expect } from 'chai';
import { FEBuilder, TypedRFE, Plantillas } from './FEBuilder';
import { Destino, FormularioCafe, TipoAmbiente, TipoEmision, TipoDocumento, TipoNaturalezaOperacion, TipoOperacion, EnvioContenedorFE, TipoGeneracion, TipoTransaccionVenta, RucType, TipoRuc, EntregaCafe, TipoReceptor, DGen, TiempoPago, FormaPago } from './models';
import { Ubicaciones } from './models/Ubicaciones';
import { Paises } from './models/Paises';
import * as forge from 'node-forge'

const SignedXml = require('web-xml-crypto').SignedXml
  , fs = require('fs')


function KeyInfoProvider(certificatePEM) {

  
  this._certificatePEM = certificatePEM;

  this.getKeyInfo = function (key, prefix) {
    var keyInfoXml,
      certObj,
      certBodyInB64;

    prefix = prefix || '';
    prefix = prefix ? prefix + ':' : prefix;

    certBodyInB64 = forge.util.encode64(forge.pem.decode(this._certificatePEM)[0].body);
    certObj = forge.pki.certificateFromPem(this._certificatePEM);

    keyInfoXml = '<' + prefix + 'X509Data>';

    keyInfoXml += '<' + prefix + 'X509SubjectName>';
    keyInfoXml += getSubjectName(certObj);
    keyInfoXml += '</' + prefix + 'X509SubjectName>';

    keyInfoXml += '<' + prefix + 'X509Certificate>';
    keyInfoXml += certBodyInB64;
    keyInfoXml += '</' + prefix + 'X509Certificate>';

    keyInfoXml += '</' + prefix + 'X509Data>';

    return keyInfoXml;
  };

  this.getKey = function () {
    return this._certificatePEM;
  };
}

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

const testMatch =
  `<rFE xmlns="http://dgi-fep.mef.gob.pa"><dVerForm>1.00</dVerForm><dId>FE01200000000000029-29-29-5676322018101525982740639300126729580548</dId><gDGen><iAmb>2</iAmb><iTpEmis>01</iTpEmis><dFechaSalida>2020-10-09T05:00:00.000Z</dFechaSalida><iTipoTranVenta>4</iTipoTranVenta><iDoc>01</iDoc><dNroDF>2598274063</dNroDF><dPtoFacDF>930</dPtoFacDF><dFechaEm>2020-10-09T05:00:00.000Z</dFechaEm><iNatOp>01</iNatOp><iTipoOp>2</iTipoOp><iDest>1</iDest><iFormCAFE>1</iFormCAFE><iEntCafe>3</iEntCafe><dEnvFe>1</dEnvFe><iProGen>1</iProGen><gEmis/><gRucEmi><dDV>56</dDV><dRuc>29-29-29</dRuc><dTipoRuc>2</dTipoRuc></gRucEmi><gUbiEm><dCodUbi>1-2-2<dProv>1</dProv><dDistr>2</dDistr><dCorreg>2</dCorreg></dCodUbi><dNombEm></dNombEm><dCoordEm>+8.9892,-79.5201</dCoordEm><dDirecEm>Calle 50</dDirecEm><gUbiEm><dCodUbi>1-2-2</dCodUbi></gUbiEm><dTfnEm>66731138</dTfnEm></gUbiEm><gDatRec/><gRucRec><dDV>56</dDV><dRuc>29-29-29</dRuc><dTipoRuc>2</dTipoRuc></gRucRec><gUbiRec><dCodUbi>13-1-3<dProv>13</dProv><dDistr>1</dDistr><dCorreg>3</dCorreg></dCodUbi><iTipoRec>01</iTipoRec><cPaisRec>PA</cPaisRec><dDirecRec>Calle 50</dDirecRec><dTfnRec>66731138</dTfnRec></gUbiRec><gAutXML><gRucAutXML><dDV>56</dDV><dRuc>29-29-29</dRuc><dTipoRuc>2</dTipoRuc></gRucAutXML></gAutXML></gDGen></rFE>`

describe("FEBuilder", function () {
  let latestFEDocument;
  beforeEach(function () {
  });

  it("should be able to create a FE with id and version", async function () {

    // Generales
    const gDGen = <DGen>{
      ...Plantillas.Pruebas,
      ...Plantillas.PruebasFechas(new Date(2020, 9, 9)),
      ...Plantillas.TodoElectronicoLocal,
      dNroDF: '2598274063',
      dPtoFacDF: '930',
      dSeg: '672958054',
      iNatOp: TipoNaturalezaOperacion.Venta,
      iTipoOp: TipoOperacion.Compra,
      iTipoTranVenta: TipoTransaccionVenta.PrestacionServicio,
      gEmis: {
        gRucEmi: {
          dTipoRuc: TipoRuc.Juridico,
          dRuc: '29-29-29',
          dDV: '56'
        },
        dNombEm: '',
        dSucEm: '7632',
        dCoordEm: '+8.9892,-79.5201',
        gUbiEm: {
          dCodUbi: Ubicaciones['BOCAS DEL TORO-CHANGUINOLA-ALMIRANTE'],
        },
        dDirecEm: 'Calle 50',
        dTfnEm: ['66731138'],
      },
      gDatRec: {
        iTipoRec: TipoReceptor.Contribuyente,
        gRucRec: {
          dTipoRuc: TipoRuc.Juridico,
          dRuc: '29-29-29',
          dDV: '56'
        },
        cPaisRec: Paises.PANAMA,
        dNombRec: '',
        gUbiRec: {
          dCodUbi: Ubicaciones['PANAMA OESTE-ARRAIJAN-CERRO SILVESTRE'],
        },
        dDirecRec: 'Calle 50',
        dTfnRec: ['66731138'],
      },
      gAutXML: [{
        gRucAutXML: {
          dTipoRuc: TipoRuc.Juridico,
          dRuc: '29-29-29',
          dDV: '56'
        },
      }]
    };

    const rfe = FEBuilder
      .create()
      .rFE({
        dId: 'FE01200000000000029-29-29-5676322018101525982740639300126729580548',
        dVerForm: 1.00,
        gDGen,
        // gItem:[{
        //   dSecItem: 1,
        //   dDescProd:  'lol',
        //   cCantCodInt: '0xab123'
        // }],
        // gTot:{
        //   dNroItems: 1,
        //   dTotGravado: 100,
        //   dTotITBMS: 0.07,
        //   dTotNeto:  100,
        //   dTotRec: 1.07,
        //   dVTot: 1.07,
        //   dVTotItems: 1,
        //   iPzPag:  TiempoPago.Inmediato,
        //   gFormaPago: [{
        //     iFormaPago: FormaPago.ACH,
        //     dVlrCuota: 1,
        //   }]
        // }
      });

     
    const res = await rfe.toXml();
    latestFEDocument = res;
    expect(res).equal(testMatch);
  });

  it("should be able to sign with RSA Key pair", async function () {
    const sig = new SignedXml()
    sig.addReference("//*[local-name(.)='rFE']", ['http://www.w3.org/2001/10/xml-exc-c14n#',
      'http://www.w3.org/2000/09/xmldsig#enveloped-signature',]
      , 'http://www.w3.org/2001/04/xmlenc#sha256', "", "", "", true)
    sig.canonicalizationAlgorithm = 'http://www.w3.org/2001/10/xml-exc-c14n#';
    sig.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
    sig.signingKey = fs.readFileSync("./test.key")
    sig.keyInfoProvider = new KeyInfoProvider(fs.readFileSync("./test.pem"))
    sig.computeSignature(latestFEDocument)
    console.log(sig)
    const output = sig.signedXml;
    console.log(output);
  });

});
