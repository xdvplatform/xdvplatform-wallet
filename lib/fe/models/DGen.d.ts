import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import { Receptor } from './Receptor';
import { Emisor } from './Emisor';
import { RucType } from './RucType';
import { AutorizadoDescargar } from './AutorizadoDescargar';
export declare enum TipoRuc {
    Natural = 1,
    Juridico = 2
}
export declare type RucRecType = RucType;
export declare enum TipoDocumento {
    FacturaOpsInterna = "01",
    FacturaImportacion = "02",
    FacturaExportacion = "03",
    NotaCreditoReferencia_FEs = "04",
    NotaDebitoReferencia_FEs = "05",
    NotaCreditoGenerica = "06",
    NotaDebitoGenerica = "07",
    FacturaZonaFranca = "08",
    Reembolso = "09"
}
export declare enum TipoEmision {
    UsoPrevioOpsNormal = "01",
    UsoPrevioOpsContigencia = "02",
    UsoPosteriorOpsNormal = "03",
    UsoPosteriorOpsContigencia = "04"
}
export declare enum TipoNaturalezaOperacion {
    Venta = "01",
    Exportacion = "02",
    Transferencia = "10",
    Devolucion = "11",
    Consignacion = "12",
    Remesa = "13",
    EntregaGratuita = "14",
    Compra = "20",
    Importacion = "21"
}
export declare enum TipoOperacion {
    Venta = 1,
    Compra = 2
}
export declare enum Destino {
    Panama = 1,
    Extranjero = 2
}
export declare enum FormularioCafe {
    SinGeneracionCAFE = 1,
    CintaPapel = 2,
    PapelFormatoCarta = 3
}
export declare enum EntregaCafe {
    SinGeneracionCAFE = 1,
    EntregadoReceptorEnPapel = 2,
    EnviadoReceptorElectronicamente = 3
}
export declare enum EnvioContenedorFE {
    Normal = 1,
    ReceptorExceptuaAlEmisorObligEnvioContenido = 2
}
export declare enum TipoGeneracion {
    SistemaFacturacionContribuyente = 1,
    TerceroContratado = 2,
    TerceroProveedorSolucion = 3,
    DGIPaginaWeb = 4,
    DGIMobileApp = 5
}
export declare enum TipoTransaccionVenta {
    Giro = 1,
    ActivoFijo = 2,
    BienesRaices = 3,
    PrestacionServicio = 4
}
export declare enum TipoSucursal {
    Retail = 1,
    AlPorMayor = 2
}
export declare enum TipoAmbiente {
    Produccion = 1,
    Pruebas = 2
}
export declare enum TipoReceptor {
    Contribuyente = "01",
    ConsumidorFinal = "02",
    Gobierno = "03",
    Extranjero = "04"
}
export declare class EmailType {
    value: string;
}
export declare class PhoneType {
    value: string;
}
export declare class DGen {
    constructor();
    /**
     * Ambientes de destino de la FE
     */
    iAmb: TipoAmbiente;
    /**
     * Tipo de Emision
     */
    iTpEmis: TipoEmision;
    /**
     *             ID: B04 Fecha y hora de inicio de la operación en contingencia
     */
    dFechaCont?: Date;
    /**
     * Razón de la operación en contingencia
     */
    dMotCont?: string;
    /**
     *             ID: B06 - Tipo de documento
     */
    iDoc: TipoDocumento;
    /**
     *             B07: Número del documento fiscal en la serie correspondiente, de 000000001 a 999999999, no siendo permitido el reinicio de la numeración.
     */
    dNroDF: string;
    /**
     *             B08: Punto de Facturación del documento fiscal. La serie sirve para permitir que existan secuencias independientes de numeración de facturas, con diversas finalidades, sea por libre elección del emisor, tales como puntos de facturación distintos (como cajas de un supermercado, o bodegas de un distribuidor), tipos de productos, especies de operación, etc., sea para finalidades que vengan  a ser determinadas por la DIRECCIÓN GENERAL DE INGRESOS.
     */
    dPtoFacDF: string;
    /**
     *             B09: Codigo de seguridad.
     */
    dSeg: string;
    /**
     *             B10: Fecha de emisión del documento
     */
    dFechaEm: Date;
    /**
     *             B11: Fecha de salida de las mercancías. Informar cuando sea conocida
     */
    dFechaSalida?: Date;
    /**
     *             B12: Naturaleza de la Operación
     */
    iNatOp: TipoNaturalezaOperacion;
    /**
     *             B13: Tipo de la operación
     */
    iTipoOp: TipoOperacion;
    /**
     *             B14: Destino u origen de la operación
     */
    iDest: Destino;
    /**
     *             B15: Formato de generación del CAFE
     */
    iFormCafe: FormularioCafe;
    /**
     *             B16: Manera de entrega del CAFE al receptor
     */
    iEntCafe: EntregaCafe;
    /***
            B17: Envío del contenedor para el receptor
     *
     */
    dEnvFe: EnvioContenedorFE;
    /**
     *             B18: Proceso de generación de la FE
     */
    iProGen: TipoGeneracion;
    /**
     *             B19: Tipo de transacción de venta
     */
    iTipoTranVenta?: TipoTransaccionVenta;
    /**
     *             B20: Tipo de Sucursal
     */
    iTipoSuc?: TipoSucursal;
    /**
     *             B29: Informaciones de interés del emitente con respecto a la FE
     */
    dIntEmFe?: string;
    /***
     * Emisor
     */
    gEmis: Emisor;
    /**
     * Receptor
     */
    gDatRec: Receptor;
    gAutXML?: AutorizadoDescargar[];
    static toXmlObject(instance: DGen, parent: XMLBuilder): any;
}
