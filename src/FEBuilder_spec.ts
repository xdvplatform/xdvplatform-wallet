import { expect } from 'chai';
import { FEBuilder, TypedRFE, Plantillas } from './FEBuilder';
import { Destino, FormularioCafe, TipoAmbiente, TipoEmision, TipoDocumento, TipoNaturalezaOperacion, TipoOperacion, EnvioContenedorFE, TipoGeneracion, TipoTransaccionVenta, RucType, TipoRuc, EntregaCafe, TipoReceptor, DGen } from './models';
import { Ubicaciones } from './models/Ubicaciones';
import { Paises } from './models/Paises';
const testMatch =
  `<rFE xmlns="http://dgi-fep.mef.gob.pa"><dVerForm>1.00</dVerForm><dId>FE01200000000000029-29-29-5676322018101525982740639300126729580548</dId><gDGen><iAmb>2</iAmb><iTpEmis>01</iTpEmis><dFechaSalida>2020-10-09T05:00:00.000Z</dFechaSalida><iTipoTranVenta>4</iTipoTranVenta><iDoc>01</iDoc><dNroDF>2598274063</dNroDF><dPtoFacDF>930</dPtoFacDF><dFechaEm>2020-10-09T05:00:00.000Z</dFechaEm><iNatOp>01</iNatOp><iTipoOp>2</iTipoOp><iDest>1</iDest><iFormCAFE>1</iFormCAFE><iEntCafe>3</iEntCafe><dEnvFe>1</dEnvFe><iProGen>1</iProGen><gEmis/><gRucEmi><dDV>56</dDV><dRuc>29-29-29</dRuc><dTipoRuc>2</dTipoRuc></gRucEmi><gUbiEm><dCodUbi>1-2-2<dProv>1</dProv><dDistr>2</dDistr><dCorreg>2</dCorreg></dCodUbi><dNombEm></dNombEm><dCoordEm>+8.9892,-79.5201</dCoordEm><dDirecEm>Calle 50</dDirecEm><gUbiEm><dCodUbi>1-2-2</dCodUbi></gUbiEm><dTfnEm>66731138</dTfnEm></gUbiEm><gDatRec/><gRucRec><dDV>56</dDV><dRuc>29-29-29</dRuc><dTipoRuc>2</dTipoRuc></gRucRec><gUbiRec><dCodUbi>13-1-3<dProv>13</dProv><dDistr>1</dDistr><dCorreg>3</dCorreg></dCodUbi><iTipoRec>01</iTipoRec><cPaisRec>PA</cPaisRec><dDirecRec>Calle 50</dDirecRec><dTfnRec>66731138</dTfnRec></gUbiRec><gAutXML><gRucAutXML><dDV>56</dDV><dRuc>29-29-29</dRuc><dTipoRuc>2</dTipoRuc></gRucAutXML></gAutXML></gDGen></rFE>`

describe("FEBuilder", function () {


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
        gDGen
      });


    const res = await rfe.toXml();
    expect(res).equal(testMatch);
  });


});
