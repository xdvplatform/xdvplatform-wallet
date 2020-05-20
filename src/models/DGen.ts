import moment from 'moment';
import {
    IsPositive, Min, IsEthereumAddress, MinLength,
    MaxLength, validateOrReject, arrayMinSize,
    ArrayMinSize, ArrayMaxSize, Matches, IsInt, IsIn, IsEnum, IsDate, IsString, ValidateNested
} from 'class-validator';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import { Receptor } from './Receptor';
import { Emisor } from './Emisor';
import { RucType } from './RucType';
import { AutorizadoDescargar } from './AutorizadoDescargar';

export enum TipoRuc {
    Natural = 1,
    Juridico = 2,
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

export class EmailType {
    public value: string;
}

export class PhoneType {
    public value: string;
}

export class DGen {

    /**
     * Ambientes de destino de la FE
     */
    @IsEnum(TipoAmbiente)
    public iAmb: TipoAmbiente;

    /**
     * Tipo de Emision
     */
    @IsEnum(TipoEmision)
    public iTpEmis: TipoEmision;

    /**
     *             ID: B04 Fecha y hora de inicio de la operación en contingencia
     */
    @IsDate()
    public dFechaCont?: Date;

    /**
     * Razón de la operación en contingencia
     */
    @MaxLength(150)
    @MinLength(15)
    public dMotCont?: string;

    /**
     *             ID: B06 - Tipo de documento
     */
    @IsEnum(TipoDocumento)
    public iDoc: TipoDocumento;

    /**
     *             B07: Número del documento fiscal en la serie correspondiente, de 000000001 a 999999999, no siendo permitido el reinicio de la numeración.
     */
    @Matches('^(?=.*[1-9].*)[0-9]{10}$')
    public dNroDF: string;

    /**
     *             B08: Punto de Facturación del documento fiscal. La serie sirve para permitir que existan secuencias independientes de numeración de facturas, con diversas finalidades, sea por libre elección del emisor, tales como puntos de facturación distintos (como cajas de un supermercado, o bodegas de un distribuidor), tipos de productos, especies de operación, etc., sea para finalidades que vengan  a ser determinadas por la DIRECCIÓN GENERAL DE INGRESOS.
     */
    @Matches('^^(?=.*[1-9].*)[0-9]{3}$')
    public dPtoFacDF: string;

    /**
     *             B09: Codigo de seguridad.
     */
    @Matches('(?=.*[1-9].*)[0-9]{9}')
    public dSeg: string;

    /**
     *             B10: Fecha de emisión del documento
     */
    @IsDate()
    public dFechaEm: Date;

    /**
     *             B11: Fecha de salida de las mercancías. Informar cuando sea conocida
     */
    @IsDate()
    public dFechaSalida?: Date;

    /**
     *             B12: Naturaleza de la Operación
     */
    @IsEnum(TipoNaturalezaOperacion)
    public iNatOp: TipoNaturalezaOperacion;


    /**
     *             B13: Tipo de la operación
     */
    @IsEnum(TipoOperacion)
    public iTipoOp: TipoOperacion;

    /**
     *             B14: Destino u origen de la operación
     */
    @IsEnum(Destino)
    public iDest: Destino;

    /**
     *             B15: Formato de generación del CAFE
     */
    @IsEnum(FormularioCafe)
    public iFormCafe: FormularioCafe;


    /**
     *             B16: Manera de entrega del CAFE al receptor
     */
    @IsEnum(EntregaCafe)
    public iEntCafe: EntregaCafe;

    /***
            B17: Envío del contenedor para el receptor
     * 
     */
    @IsEnum(EnvioContenedorFE)
    public dEnvFe: EnvioContenedorFE;

    /**
     *             B18: Proceso de generación de la FE
     */
    @IsEnum(TipoGeneracion)
    public iProGen: TipoGeneracion;


    /**
     *             B19: Tipo de transacción de venta
     */
    @IsEnum(TipoTransaccionVenta)
    public iTipoTranVenta?: TipoTransaccionVenta;


    /**
     *             B20: Tipo de Sucursal
     */
    @IsEnum(TipoSucursal)
    public iTipoSuc?: TipoSucursal;

    /**
     *             B29: Informaciones de interés del emitente con respecto a la FE
     */
    @MaxLength(5000)
    public dIntEmFe?: string;

    /***
     * Emisor
     */
    @ValidateNested()
    public gEmis: Emisor;

    /**
     * Receptor
     */
    @ValidateNested()
    public gDatRec: Receptor;

    // public gFExp?: Exportacion;

    // @ArrayMaxSize(99)
    // public gDFRef?: DocumentoFiscalReferenciado[];

    // Grupo de datos que identifican al autorizado a descargar
    @ArrayMaxSize(10)
    public gAutXML?: AutorizadoDescargar[];

    public static toXmlObject(instance: DGen, parent: XMLBuilder) {

        let node = parent.ele('gDGen')
            .ele('iAmb').txt((<TipoAmbiente>instance.iAmb).toFixed()).up()
            .ele('iTpEmis').txt(instance.iTpEmis).up();


        if (instance.dIntEmFe) {
            node = node.ele('dIntEmFe').txt(instance.dIntEmFe).up();
        }


        if (instance.dFechaCont) {
            node = node.ele('dFechaCont').txt(moment(instance.dFechaCont).format()).up();
        }

        if (instance.dFechaSalida) {
            node = node.ele('dFechaSalida').txt(moment(instance.dFechaSalida).format()).up();
        }

        if (instance.iTipoTranVenta) {
            node = node.ele('iTipoTranVenta').txt(instance.iTipoTranVenta.toFixed()).up();
        }

        if (instance.dMotCont) {
            node = node.ele('dMotCont').txt(instance.dMotCont).up();
        }
        node = node.ele('iDoc').txt(instance.iDoc).up()
            .ele('dNroDF').txt(instance.dNroDF).up()
            .ele('dPtoFacDF').txt(instance.dPtoFacDF).up()
            .ele('dFechaEm').txt(moment(instance.dFechaEm).format()).up()
            .ele('iNatOp').txt(instance.iNatOp).up()
            .ele('iTipoOp').txt(instance.iTipoOp.toFixed()).up()
            .ele('iDest').txt(instance.iDest.toFixed()).up()
            .ele('iFormCAFE').txt(instance.iFormCafe.toFixed()).up()
            .ele('iEntCafe').txt(instance.iEntCafe.toFixed()).up()
            .ele('dEnvFe').txt(instance.dEnvFe.toFixed()).up()
            .ele('iProGen').txt(instance.iProGen.toFixed()).up();

        node = Emisor.toXmlObject(instance.gEmis, node).up();
        node = Receptor.toXmlObject(instance.gDatRec, node).up();

        if (instance.gAutXML) {
            node = node.ele('gAutXML');

            instance.gAutXML.map(i => {
               return RucType.toXmlObject(i.gRucAutXML, 'gRucAutXML', node);
            });
        }
        return node;
    }
}
