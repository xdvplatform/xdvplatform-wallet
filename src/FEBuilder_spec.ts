import * as Ubicaciones from './xsd/FE_ubicaciones_v1.00.xsd.json';
import * as Paises from  './xsd/FE_paises_v1.00.xsd.json';
import { expect } from 'chai';
import { FEBuilder, TypedRFE, Plantillas } from './FEBuilder';
import { Destino, FormularioCafe, TipoAmbiente, TipoEmision, TipoDocumento, TipoNaturalezaOperacion, TipoOperacion, EnvioContenedorFE, TipoGeneracion, TipoTransaccionVenta, RucType, TipoRuc, EntregaCafe, TipoReceptor } from './models';
const testMatch =
  `<rFE xmlns="http://dgi-fep.mef.gob.pa"><dVerForm>1.00</dVerForm><dId>FE01200000000000029-29-29-5676322018101525982740639300126729580548</dId></rFE>`

describe("FEBuilder", function () {


  beforeEach(function () {
  });

  it("should be able to create a FE with id and version", async function () {

    
    const rfe = FEBuilder
      .create()
      .rFE({
        dId: 'FE01200000000000029-29-29-5676322018101525982740639300126729580548',
        dVerForm: 1.00,
        gDGen: {
          ...Plantillas.Pruebas,
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
        },
      })

    const res = await rfe.toXml();
    expect(res).equal(testMatch);
  });


});
