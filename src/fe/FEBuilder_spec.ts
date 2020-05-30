import { expect } from 'chai';
import { X509 } from '../crypto';
import { FEBuilder, Plantillas } from './FEBuilder';
import { Destino, FormularioCafe, TipoAmbiente, TipoEmision, TipoDocumento, TipoNaturalezaOperacion, TipoOperacion, EnvioContenedorFE, TipoGeneracion, TipoTransaccionVenta, RucType, TipoRuc, EntregaCafe, TipoReceptor, DGen, TiempoPago, FormaPago, Item, Totales, TasaITBMS } from './models';
import { Ubicaciones } from './models/Ubicaciones';
import { Unidades } from './models/Unidades';
import { CatBienes } from './models/CatBienes';
import { DescBienes } from './models/DescBienes';
import { Paises } from './models/Paises';
import { XmlDsig, Wallet, KeyConvert, X509Info } from '../crypto';
const SignedXml = require('web-xml-crypto').SignedXml
  , fs = require('fs')

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

    const rsaKeyExports = await KeyConvert.getX509RSA(rsaKey, issuer, issuer);
    const selfSignedCert = X509.createSelfSignedCertificateFromRSA(rsaKeyExports.pem);
    try {
      const signedDocuments = await XmlDsig.signFEDocument(rsaKeyExports.pem, selfSignedCert, latestFEDocument);
      console.log(signedDocuments);
    } catch (e) {
      console.log(e);
    }
  });


});
