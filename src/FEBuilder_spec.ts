import { WorkflowBuilder, RlpDocumentPayload, WTemplate, OperationType, FileContentType } from './WorkflowBuilder';
import { expect } from 'chai';
import { FEBuilder } from './FEBuilder';
import { DId, DVerForm } from './models';


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
      dVerForm: 1.00
    })

    const res = await rfe.toXml();
    expect(res).equal(testMatch);
  });


});
