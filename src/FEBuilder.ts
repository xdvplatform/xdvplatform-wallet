import { DGen, DVerForm, DId, TipoAmbiente, FormularioCafe, EntregaCafe, TipoGeneracion, Destino, TipoEmision, TipoDocumento, EnvioContenedorFE, Item, Totales } from './models';
import { IsPositive, Min, IsEthereumAddress, MaxLength, validateOrReject, arrayMinSize, ArrayMinSize, ArrayMaxSize, IsDefined, ValidateNested } from 'class-validator';
import { create } from 'xmlbuilder2';
import { TypedRFE } from './TypedRFE';

export const Plantillas = {
  PruebasFechas: (dt) => ({
    dFechaEm: dt,
    dFechaSalida: dt,
  }),
  Pruebas: {
    iAmb: TipoAmbiente.Pruebas
  },
  TodoElectronicoLocal: {
    iFormCafe: FormularioCafe.SinGeneracionCAFE,
    iEntCafe: EntregaCafe.EnviadoReceptorElectronicamente,
    iProGen: TipoGeneracion.SistemaFacturacionContribuyente,
    iDest: Destino.Panama,
    iTpEmis: TipoEmision.UsoPrevioOpsNormal,
    iDoc: TipoDocumento.FacturaOpsInterna,
    dEnvFe: EnvioContenedorFE.Normal,

  }
};

export class FEBuilder {
  @IsDefined()
  @ValidateNested()
  private _rFE: TypedRFE;


  constructor() {
  }


  public static create() {
    return new FEBuilder();
  }
  /**
   * Sets the DId type
   * @param entry 
   */
  public rFE(entry: TypedRFE, ...sources: any[]) {
    this._rFE = Object.assign(new TypedRFE(), {
      ...entry,
    }, ...sources)
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
      .ele('dId').txt(this._rFE.dId).up();

    console.log(this._rFE.gDGen)
    // add dGen
    let parent = DGen.toXmlObject(this._rFE.gDGen, doc).up();

    // add gItem
    if (this._rFE.gItem) {
      this._rFE.gItem.forEach(i => {
          parent = Item.toXmlObject(i, parent).up();
      });
      // parent = parent.up()
  }

    // add gTot
    parent = Totales.toXmlObject(this._rFE.gTot, parent).up();

    const xmlString = parent.end({ headless: true, prettyPrint: false });
    console.log(xmlString);
    return xmlString;
  }
};
