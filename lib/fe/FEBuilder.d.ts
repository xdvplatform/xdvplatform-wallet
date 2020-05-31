import { TipoAmbiente, FormularioCafe, EntregaCafe, TipoGeneracion, Destino, TipoEmision, TipoDocumento, EnvioContenedorFE } from './models';
import { TypedRFE } from './TypedRFE';
export declare const Plantillas: {
    PruebasFechas: (dt: any) => {
        dFechaEm: any;
        dFechaSalida: any;
    };
    Pruebas: {
        iAmb: TipoAmbiente;
    };
    TodoElectronicoLocal: {
        iFormCafe: FormularioCafe;
        iEntCafe: EntregaCafe;
        iProGen: TipoGeneracion;
        iDest: Destino;
        iTpEmis: TipoEmision;
        iDoc: TipoDocumento;
        dEnvFe: EnvioContenedorFE;
    };
};
export declare class FEBuilder {
    private _rFE;
    constructor();
    static create(): FEBuilder;
    /**
     * Sets the DId type
     * @param entry
     */
    rFE(entry: TypedRFE, ...sources: any[]): this;
    toXml(): Promise<string>;
}
