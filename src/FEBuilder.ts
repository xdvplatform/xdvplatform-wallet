import { DGen, DVerForm, DId } from './models';
import { IsPositive, Min, IsEthereumAddress, MinLength, MaxLength, validateOrReject, arrayMinSize, ArrayMinSize, ArrayMaxSize, IsDefined, Matches, ValidateNested, IsNumber } from 'class-validator';
import { create } from 'xmlbuilder2';

export class TypedRFE {
  @IsNumber()
  public dVerForm: number;

  @Matches(/[F][E](([A|V|T|E|P|N|I]|[-]|[a-zA-Z0-9]){64})?/)
  @MinLength(64)
  public dId: string;

  @IsDefined()
  @ValidateNested()
  public gDGen: DGen;
}


export class FEBuilder {
  @IsDefined()
  @ValidateNested()
  private _rFE: TypedRFE;
  // private items: Item[];
  // private total: Tot;
  // private pedComGl?: PedComGl;
  // private infoLog?: InfoLog;
  // private lcEntr?: LcEntr;

  constructor() {
  }


  public static create() {
    return new FEBuilder();
  }
  /**
   * Sets the DId type
   * @param entry 
   */
  public rFE(entry: TypedRFE) {
    this._rFE = Object.assign(new TypedRFE(), entry)
    return this;
  }



  public async toXml() {
    await validateOrReject(this._rFE);
    const rfe = 'http://dgi-fep.mef.gob.pa';
    const xsi = 'http://www.w3.org/2001/XMLSchema-instance'

    const doc = create({
      defaultNamespace: {
        ele: rfe,
        att: null,
      }
    }).ele('rFE')
      .ele('dVerForm').txt(this._rFE.dVerForm.toFixed(2)).up()
      .ele('dId').txt(this._rFE.dId).up()
      .doc();

    const xmlString = doc.end({ headless: true, prettyPrint: false });
    console.log(xmlString);
    return xmlString;
  }
};
