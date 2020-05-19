import {
    IsPositive, Min, IsEthereumAddress, MinLength,
    MaxLength, validateOrReject, arrayMinSize,
    ArrayMinSize, ArrayMaxSize, Matches, IsInt, IsIn, IsEnum, IsDate, IsString
} from 'class-validator';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';

export enum TipoRuc {
    Natural = 1,
    Juridico = 2,
}

export class RucType {
    @IsEnum(TipoRuc)
    public dTipoRuc: TipoRuc;

    @Matches('(([P][E][-](([-]|[0-9]){1,17})|[N][-](([-]|[0-9]){1,18})|[E][-](([-]|[0-9]){1,18})|(([-]|[0-9]){5,20}))|(((([0-9]{1})[-][A][V][-](([-]|[0-9]){1,15}))|(([0-9]{2})[-][A][V][-](([-]|[0-9]){1,14})))|((([0-9]{1,2})[-][N][T][-](([-]|[0-9]){1,15}))|(([0-9]{1,2})[-][N][T][-](([-]|[0-9]){1,14}))|([N][T][-](([-]|[0-9]){1,14}))|(([0-9]{1,2})[-][P][I][-](([-]|[0-9]){1,14}))|([P][I][-](([-]|[0-9]){1,14}))|(([0-9]){1,2}[P][I][-](([-]|[0-9]){1,14})))))?')
    public dRuc: string;

    @Matches('[0-9]{2}')
    public dDV: string;
}

export type RucRecType = RucType;

export enum TipoDocumento {
    FacturaOpsInterna = '01',
    FacturaImportacion = '02',
    FacturaExportacion = '03',
    NotaCreditoReferencia_FEs = '04',
    NotaDebitoReferencia_FEs = '05',
    NotaCreditoGenerica = '06',
    NotaDebitoGenerica = '07',
    FacturaZonaFranca = '08',
    Reembolso = '09'
}

export enum TipoEmision {
    UsoPrevioOpsNormal = '01',
    UsoPrevioOpsContigencia = '02',
    UsoPosteriorOpsNormal = '03',
    UsoPosteriorOpsContigencia = '04'
}

export enum TipoNaturalezaOperacion {
    Venta = '01',
    Exportacion = '02',
    Transferencia = '10',
    Devolucion = '11',
    Consignacion = '12',
    Remesa = '13',
    EntregaGratuita = '14',
    Compra = '20',
    Importacion = '21'
}

export enum TipoOperacion {
    Venta = 1,
    Compra = 2
}

export enum Destino {
    Panama = 1,
    Extranjero = 2,
}

export enum FormularioCafe {
    SinGeneracionCAFE = 1,
    CintaPapel = 2,
    PapelFormatoCarta = 3
}

export enum EntregaCafe {
    SinGeneracionCAFE = 1,
    EntregadoReceptorEnPapel = 2,
    EnviadoReceptorElectronicamente = 3
}

export enum EnvioContenedorFE {
    Normal = 1,
    ReceptorExceptuaAlEmisorObligEnvioContenido = 2
}

export enum TipoGeneracion {
    SistemaFacturacionContribuyente = 1,
    TerceroContratado = 2,
    TerceroProveedorSolucion = 3,
    DGIPaginaWeb = 4,
    DGIMobileApp = 5,
}

export enum TipoTransaccionVenta {
    Giro = 1,
    ActivoFijo = 2,
    BienesRaices = 3,
    PrestacionServicio = 4
}

export enum TipoSucursal {
    Retail = 1,
    AlPorMayor = 2,
}


export enum TipoAmbiente {
    Produccion = 1,
    Pruebas = 2,
}


export enum TipoReceptor {
    Contribuyente = '01',
    ConsumidorFinal = '02',
    Gobierno = '03',
    Extranjero = '04',
}

export class AutorizadoDescargar {
    public gRucAutXML: RucType;
}

export class CodigoUbicacionType {
    // Lookup
    public dCodUbi: string;

    @MaxLength(50)
    public dCorreg: string;

    @MaxLength(50)
    public dDistr: string;

    @MaxLength(50)
    public dProv: string;
}

export class Emisor {
    public gRucEmi: RucType;

    @MaxLength(100)
    public dNombEm: string;

    @Matches('[a-zA-Z0-9]{4}')
    public dSucEm: string;

    @MaxLength(22)
    @Matches('^([-+]?)([\d]{1,2})(((\.)[\d]{4,6}(,)))(-([\d]{2})(\.)[\d]{4,6})$')
    public dCoordEm: string;

    @MaxLength(100)
    public dDirecEm: string;

    public gUbiEm: CodigoUbicacionType;

    @ArrayMaxSize(3)
    @Matches(`[0-9]{3,4}-[0-9]{4}`)
    public dTfnEm: string[];

    @ArrayMaxSize(3)
    @Matches(`([0-9a-zA-Z#$%]([-.\w]*[0-9a-zA-Z#$%'\\.\\-_])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})`)
    public dCorElecEmi?: string[];
}

export class EmailType {
    public value: string;
}

export class PhoneType {
    public value: string;
}

export class IdExtType {
    @MaxLength(50)
    public dIdExt: string;

    @MaxLength(100)
    public dPaisExt: string;
}



export class Receptor {
    @IsEnum(TipoReceptor)
    public iTipoRec: TipoReceptor;

    public gRucRec: RucRecType;

    @MaxLength(100)
    public dNombRec?: string;

    @MaxLength(100)
    public dDirecRec?: string;

    public gUbiRec?: CodigoUbicacionType;

    public gIdExtType?: IdExtType;
    @ArrayMaxSize(3)
    @Matches(`[0-9]{3,4}-[0-9]{4}`)
    public dTfnRec: string[];

    @ArrayMaxSize(3)
    @Matches(`([0-9a-zA-Z#$%]([-.\w]*[0-9a-zA-Z#$%'\\.\\-_])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})`)
    public dCorElecRec?: string[];

    // Lookup
    public cPaisRec: string;

    @MaxLength(50)
    @MinLength(5)
    public cPaisRecDesc?: string;
}

export class DGen {

    @IsEnum(TipoAmbiente)
    public iAmb: TipoAmbiente;

    @IsEnum(TipoEmision)
    public iTpEmis: TipoEmision;

    @IsDate()
    public dFechaCont?: Date;

    @MaxLength(150)
    @MinLength(15)
    public dMotCont?: string;

    @IsEnum(TipoDocumento)
    public iDoc: TipoDocumento;

    @Matches('^(?=.*[1-9].*)[0-9]{10}$')
    public dNroDF: string;

    @Matches('^^(?=.*[1-9].*)[0-9]{3}$')
    public dPtoFacDF: string;

    @Matches('(?=.*[1-9].*)[0-9]{9}')
    public dSeg: string;

    @IsDate()
    public dFechaEm: Date;

    @IsDate()
    public dFechaSalida?: Date;

    @IsEnum(TipoNaturalezaOperacion)
    public iNatOp: TipoNaturalezaOperacion;


    @IsEnum(TipoOperacion)
    public iTipoOp: TipoOperacion;

    @IsEnum(Destino)
    public iDest: Destino;

    @IsEnum(FormularioCafe)
    public iFormCafe: FormularioCafe;


    @IsEnum(EntregaCafe)
    public iEntCafe: EntregaCafe;

    /***
            B17: Envío del contenedor para el receptor
     * 
     */
    @IsEnum(EnvioContenedorFE)
    public dEnvFe: EnvioContenedorFE;

    @IsEnum(TipoGeneracion)
    public iProGen: TipoGeneracion;


    @IsEnum(TipoTransaccionVenta) 
    public iTipoTranVenta?: TipoTransaccionVenta;


    @IsEnum(TipoSucursal)
    public iTipoSuc?: TipoSucursal;

    @MaxLength(5000)
    public dIntEmFe?: string;

    /***
     * Emisor
     */
    public gEmis: Emisor;

    /**
     * Receptor
     */
    public gDatRef: Receptor;

    // public gFExp?: Exportacion;

    // @ArrayMaxSize(99)
    // public gDFRef?: DocumentoFiscalReferenciado[];

    // Grupo de datos que identifican al autorizado a descargar
    @ArrayMaxSize(10)
    public gAutXML?: AutorizadoDescargar[];

    public toXmlObject(builder: XMLBuilder){
        return builder;
    }
}
