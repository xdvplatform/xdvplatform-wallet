import { expect } from 'chai';
import { FEBuilder, Plantillas } from './FEBuilder';
import { Destino, FormularioCafe, TipoAmbiente, TipoEmision, TipoDocumento, TipoNaturalezaOperacion, TipoOperacion, EnvioContenedorFE, TipoGeneracion, TipoTransaccionVenta, RucType, TipoRuc, EntregaCafe, TipoReceptor, DGen, TiempoPago, FormaPago, Item, Totales, TasaITBMS } from './models';
import { Ubicaciones } from './models/Ubicaciones';
import { Unidades } from './models/Unidades';
import { CatBienes } from './models/CatBienes';
import { DescBienes } from './models/DescBienes';
import { Paises } from './models/Paises';
import * as forge from 'node-forge'
import { min } from 'class-validator';
import { create } from 'xmlbuilder2';

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
const testMatch = `<rFE xmlns="http://dgi-fep.mef.gob.pa"><dVerForm>1.00</dVerForm><dId>FE01200000000000029-29-29-5676322018101525982740639300126729580548</dId><gDGen><iAmb>2</iAmb><iTpEmis>01</iTpEmis><dFechaSalida>2020-10-09T00:00:00-05:00</dFechaSalida><iTipoTranVenta>1</iTipoTranVenta><iDoc>01</iDoc><dNroDF>2598274063</dNroDF><dPtoFacDF>930</dPtoFacDF><dFechaEm>2020-10-09T00:00:00-05:00</dFechaEm><iNatOp>01</iNatOp><iTipoOp>2</iTipoOp><iDest>1</iDest><iFormCAFE>1</iFormCAFE><iEntCafe>3</iEntCafe><dEnvFe>1</dEnvFe><iProGen>1</iProGen><gEmis/><gRucEmi><dDV>56</dDV><dRuc>29-29-29</dRuc><dTipoRuc>2</dTipoRuc></gRucEmi><gUbiEm><dCodUbi>1-1-2<dProv>1</dProv><dDistr>1</dDistr><dCorreg>2</dCorreg></dCodUbi><dNombEm></dNombEm><dCoordEm>+8.9892,-79.5201</dCoordEm><dDirecEm>Calle 50</dDirecEm><gUbiEm><dCodUbi>1-1-2</dCodUbi></gUbiEm><dTfnEm>66731138</dTfnEm></gUbiEm><gDatRec/><gRucRec><dDV>56</dDV><dRuc>29-29-29</dRuc><dTipoRuc>2</dTipoRuc></gRucRec><gUbiRec><dCodUbi>13-1-3<dProv>13</dProv><dDistr>1</dDistr><dCorreg>3</dCorreg></dCodUbi><iTipoRec>01</iTipoRec><cPaisRec>PA</cPaisRec><dDirecRec>Calle 50</dDirecRec><dTfnRec>66731138</dTfnRec></gUbiRec><gAutXML><gRucAutXML><dDV>56</dDV><dRuc>29-29-29</dRuc><dTipoRuc>2</dTipoRuc></gRucAutXML></gAutXML><gItem><cCantCodInt>1</cCantCodInt><dDescProd>Servicios profesionales Abril Mayo 2020 relacionado a desarrollo web</dDescProd><dSecItem>1</dSecItem><gPrecios><dPrItem>500</dPrItem><dPrUnit>500</dPrUnit><dValTotItem>500</dValTotItem><gITBMSItem><dTasaITBMS>00</dTasaITBMS><dValITBMS>0</dValITBMS><dInfEmFE>No reembolsable</dInfEmFE><cUnidad>Actividad</cUnidad></gITBMSItem><gItem><cCantCodInt>1</cCantCodInt><dDescProd>Investigacion de algoritmo para firmar una factura electronica</dDescProd><dSecItem>2</dSecItem><gPrecios><dPrItem>500</dPrItem><dPrUnit>500</dPrUnit><dValTotItem>500</dValTotItem><gITBMSItem><dTasaITBMS>00</dTasaITBMS><dValITBMS>0</dValITBMS><dInfEmFE>Probablemente posible</dInfEmFE><dCodCPBScmp>4323</dCodCPBScmp><dCodCPBSabr>80</dCodCPBSabr></gITBMSItem><gTot><iPzPag>2</iPzPag><dNroItems>1.00</dNroItems><dTotITBMS>0.00</dTotITBMS><dTotNeto>1000.00</dTotNeto><dTotRec>0.00</dTotRec><dTotGravado>1000.00</dTotGravado><dVTot>1000.00</dVTot><dVTotItems>1.00</dVTotItems><dVuelto>0.00</dVuelto></gTot></gPrecios></gItem></gPrecios></gItem></gDGen></rFE>`
describe("FEBuilder", function () {
  let latestFEDocument;
  let feDoocument;
  let feSigned;
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
      iTipoTranVenta: TipoTransaccionVenta.Giro,
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
          dCodUbi: Ubicaciones['BOCAS DEL TORO-BOCAS DEL TORO-BASTIMENTOS'],
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


    const gItem: Item[] = [
      {
        dSecItem: 1,
        dDescProd: 'Servicios profesionales Abril Mayo 2020 relacionado a desarrollo web',
        cCantCodInt: 1,
        cUnidad: Unidades['Actividad: una unidad de trabajo o acción'],
        dInfEmFE: 'No reembolsable',
        gPrecios: {
          dPrItem: 500,
          dPrUnit: 500,
          dValTotItem: 500
        },
        gITBMSItem: {
          dTasaITBMS: TasaITBMS.TasaExonerado,
          dValITBMS: 0
        }
      }, {
        dSecItem: 2,
        dDescProd: 'Investigacion de algoritmo para firmar una factura electronica',
        cCantCodInt: 1,
        dCodCPBSabr: CatBienes['Servicios de Gestión, Servicios Profesionales de Empresa y Servicios Administrativos'],
        dCodCPBScmp: DescBienes.Software,
        dInfEmFE: 'Probablemente posible',
        gPrecios: {
          dPrItem: 500,
          dPrUnit: 500,
          dValTotItem: 500
        },
        gITBMSItem: {
          dTasaITBMS: TasaITBMS.TasaExonerado,
          dValITBMS: 0
        }
      }
    ];

    const gTot: Totales = {
      dNroItems: 1,
      dTotGravado: 1000,
      dTotITBMS: 0,
      dTotNeto: 1000,
      dTotRec: 0,
      dVTot: 1000,
      dVTotItems: 1,
      dVuelto: 0,
      iPzPag: TiempoPago.Plazo,
      gFormaPago: [{
        iFormaPago: FormaPago.Otro,
        dVlrCuota: 1
      }]
    };

    const rfe = FEBuilder
      .create()
      .rFE({
        dId: 'FE01200000000000029-29-29-5676322018101525982740639300126729580548',
        dVerForm: 1.00,
        gDGen,
        gItem,
        gTot,
      });


    const res = await rfe.toXml();
    latestFEDocument = res;
    feDoocument = rfe;
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
    feSigned = create(output).end({ format: 'object' });
    console.log(output);
  });


  it('should be able to store FE in IPLD', async function () {
    const IPFS = require('ipfs');
    const { DAGNode } = require('ipld-dag-pb');

    function createNode(options) {
      options = options || {}
      options.path = options.path || '/tmp/ipfs' + Math.random()
      return IPFS.create({
        repo: options.path,
        config: {
          Addresses: {
            Swarm: [
              '/ip4/0.0.0.0/tcp/0'
            ],
            API: '/ip4/127.0.0.1/tcp/0',
            Gateway: '/ip4/127.0.0.1/tcp/0'
          },
          "AutoNAT": {},
          "Bootstrap": [
            "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
            "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
            "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
            "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
            "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ"
          ],
        }
      })
    }
    const ipfs = await createNode();
    
    // Two Parties - Use Elliptic for ephemeral EdDSA key generation
    // Alice: 
    // - Encrypt with Bob's public key
    // - Sign payload with Alice's private key

    // Bob:
    // - Decrypt with Bob's private key
    // - Verify with Alice's public key

    // Later: Multi Party Verification - Use noble-bls12-381 / anonymous-credentials

      console.log('\nStart of the example:')

      const myData = {
        did: '0x',
        signature: '',
        timestamp: new Date().toISOString(),
        invoiceContainer: {
          encrypted: '',
          metadata: {
            id: feDoocument._rFE.dId,
            from: feDoocument._rFE.gDGen.gEmis.gRucEmi,
            to: feDoocument._rFE.gDGen.gDatRec.gRucRec
          },
          detachedDocumentSignature: feSigned.rFE.Signature,
        },
      }
      const someData = Buffer.from(JSON.stringify(latestFEDocument))
      const pbNode = new DAGNode(someData)
    
      const pbNodeCid = await ipfs.dag.put(pbNode, {
        format: 'dag-pb',
        hashAlg: 'sha2-256'
      })

      // myData.invoice = pbNodeCid;


      const cid = await ipfs.dag.put(myData, { format: 'dag-cbor', hashAlg: 'sha2-256' })
      const result = await ipfs.dag.get(cid, 'invoiceContainer')
      for await (const path of ipfs.dag.tree(cid, { recursive: true })) {
        console.log(path)
      }
    

      console.log(JSON.stringify(result))
  });
});
