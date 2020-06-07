import moment from 'moment';
import {
  BlockSchema,
  DIDNodeSchema,
  DocumentNodeSchema,
  EventType,
  LogNodeSchema
  } from '../storage';
import { CatBienes } from './models/CatBienes';
import { DescBienes } from './models/DescBienes';
import {
  Destino,
  DGen,
  EntregaCafe,
  EnvioContenedorFE,
  FormaPago,
  FormularioCafe,
  Item,
  RucType,
  TasaITBMS,
  TiempoPago,
  TipoAmbiente,
  TipoDocumento,
  TipoEmision,
  TipoGeneracion,
  TipoNaturalezaOperacion,
  TipoOperacion,
  TipoReceptor,
  TipoRuc,
  TipoTransaccionVenta,
  Totales
  } from './models';
import { DIDDocumentBuilder, DIDMethodXDV } from '../did';
import { eddsa } from 'elliptic';
import { expect } from 'chai';
import { FEBuilder, Plantillas } from './FEBuilder';
import { IpldClient } from '../ipld';
import {
  KeyConvert,
  Wallet,
  X509Info,
  XmlDsig
  } from '../crypto';
import { LDCryptoTypes, X509 } from '../crypto';
import { Paises } from './models/Paises';
import { Ubicaciones } from './models/Ubicaciones';
import { Unidades } from './models/Unidades';

const ipld = new IpldClient();
const xdvMethod = new DIDMethodXDV(ipld);
const localStorage = {};

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
    const selfSignedCert = X509.createSelfSignedCertificateFromRSA(
      rsaKeyExports.pemAsPrivate, rsaKeyExports.pemAsPublic, issuer);
    try {
      const signedDocuments = await XmlDsig.signFEDocument(rsaKeyExports.pemAsPrivate, selfSignedCert, latestFEDocument);
      expect(!!signedDocuments.json).equals(true)
      expect(!!signedDocuments.xml).equals(true)
    } catch (e) {
      console.log(e);
    }
  });

  it("should be able to sign with RSA Key pair and stored in IPLD as DID tree", async function () {
    await ipld.initialize();

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
    const selfSignedCert = X509.createSelfSignedCertificateFromRSA(
      rsaKeyExports.pemAsPrivate, rsaKeyExports.pemAsPublic, issuer);
    try {
      const signedDocuments = await XmlDsig.signFEDocument(rsaKeyExports.pemAsPrivate, selfSignedCert, latestFEDocument);
      expect(!!signedDocuments.json).equals(true)
      expect(!!signedDocuments.xml).equals(true)


      // Use another different wallet for creating did
      const mnemonic = Wallet.generateMnemonic();
      const opts = { mnemonic, password: '123password' };
      const keystore = await Wallet.createHDWallet(opts);
      expect(JSON.parse(keystore).version).equal(3);

      const wallet = await Wallet.unlock(keystore, opts.password);

      const kp = wallet.getEd25519();
      const kpJwk = await KeyConvert.getEd25519(kp);

      // Create IPFS key storage lock
      const session = await xdvMethod.createIpldSession(kpJwk.pem);
      const ldCrypto = await KeyConvert.createLinkedDataJsonFormat(
        LDCryptoTypes.Ed25519, <any>kp, false);

      // Create DID document with an did-ipid based issuer
      const did = await DIDDocumentBuilder
        .createDID({
          issuer: session.key,
          verificationKeys: [ldCrypto.toPublicKey()],
          authenticationKeys: [ldCrypto.toAuthorizationKey()]
        });

      ipld.setSigner((payload) => {
        return Promise.resolve(kp.sign(<eddsa.Bytes>payload).toHex());
      });
      // DID
      let didNode = await ipld.createDidNode(did, 'my-ed25519-key');
      const published = await ipld.ipfsClient.name.publish(didNode.cid);
      console.log(published)
      // append json 
      let documentNode = await ipld.appendDocumentNode(didNode.cid, signedDocuments.json, 'mydoc');

      const blockCid = await ipld.patchBlock(null,
        [{ cid: didNode.cid, tag: 'mykey' }],
        [{ cid: documentNode.cid, tag: 'mydoc' }],
        [{ cids: [didNode.cidLog, documentNode.cidLog], timestamp: moment().unix() }]
      );

      const node = await ipld.getNode(blockCid, '/');

      expect(node.value.$block).equals(0);

      localStorage['blockCid'] = blockCid;
    } catch (e) {
      console.log(e);
    }
  });

  it("should be able to get the IPLD logs by cid", async function () {
    // await ipld.initialize();
    try {

      const block = localStorage['blockCid'];

      // get all documents
      const listDocuments = await ipld.getNode(block, '/document');
      console.log(listDocuments)
      expect(!!listDocuments.value).equals(true);

      // get did from document ref
      const did = await ipld.getNode(listDocuments.value['mydoc'], '/');
      expect(!!did).equals(true);

      // update blockchain
      const newnode = await ipld.createNode({
        testing: true
      });


      const blockCid = await ipld.patchBlock(block,
        [{ cid: newnode as string, tag: 'newnode' }],
      );

      const node = await ipld.getNode(blockCid, '/');
      console.log(node)
      expect(node.value.$ref.toString()).equals(block.toString());

    } catch (e) {
      throw e;
    }
  });
});
