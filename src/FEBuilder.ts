import { DGen, DVerForm, DId, TipoAmbiente, FormularioCafe, EntregaCafe, TipoGeneracion, Destino, TipoEmision, TipoDocumento, EnvioContenedorFE } from './models';
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
    let parent = DGen.toXmlObject(this._rFE.gDGen, doc).up()
      .doc();

    const xmlString = parent.end({ headless: true, prettyPrint: false });
    console.log(xmlString);
    return xmlString;
  }
};
