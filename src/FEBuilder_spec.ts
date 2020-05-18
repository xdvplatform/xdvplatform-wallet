import { expect } from 'chai';
import { FEBuilder, TypedRFE } from './FEBuilder';
import { DId, DVerForm, DGen, TipoAmbienteEnum, TipoEmisionEnum, DocumentTypeEnum } from './models';
const testMatch =
`<rFE xmlns="http://dgi-fep.mef.gob.pa"><dVerForm>1.00</dVerForm><dId>FE01200000000000029-29-29-5676322018101525982740639300126729580548</dId></rFE>`

describe("FEBuilder", function () {

  
  beforeEach(function () {
  });

  it("should be able to create a FE with id and version", async function () {

    const rfe = FEBuilder
    .create()
    .rFE( {
      dId: 'FE01200000000000029-29-29-5676322018101525982740639300126729580548',
      dVerForm: 1.00,
      gDGen: {
        iAmb: TipoAmbienteEnum.Pruebas,
        iTpEmis: TipoEmisionEnum.UsoPrevioOpsNormal,
        iDoc: DocumentTypeEnum.FacturaOpsInterna,
      }
    })

    const res = await rfe.toXml();
    expect(res).equal(testMatch);
  });


});
