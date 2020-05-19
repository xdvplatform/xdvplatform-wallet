import { MaxLength, ArrayMaxSize, Matches, ValidateNested, ArrayMinSize, IsNumber, IsDefined } from 'class-validator';
import { RucType } from "./RucType";
import { CodigoUbicacionType } from "./CodigoUbicacionType";
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';


interface gTotTypeGDescBonifType {

    /** D200: Descripción de descuentos o bonificaciones adicionales aplicados a la factura */
    dDetalDesc: string;
    /** D201: Monto Descuentos/Bonificaciones y otros ajustes */
    dValDesc: number;
}

export  class FormaPagoType {
    /** D302: Descripción de forma de pago no listada en el formato */
    dFormaPagoDesc?: string;
    /** D303: Valor de la fracción pagada utilizando esta forma de pago */
    dVlrCuota: number;
    /** D301: Forma de pago de la factura */
    iFormaPago: FormaPago;
}

export enum FormaPago {
    Credito = '01',
    Contado = '02',
    TarjetaCredito = '03',
    TarjetaDebito = '04',
    TarjetaFidelidad = '05',
    ValeDevolucion = '06',
    ValeRegalo = '07',
    ACH = '08',
    Otro = '99',
}
export class gTotTypeGOTITotalType {
    /** D601:Código de Otras Tasas o Impuesto del total del ítem */
    dCodOTITotal: OtrosImpuestos;
    /** D602:Monto de Otras Tasas o Impuesto del total del ítem */
    dValOTITotal: number;
}


export class gTotTypeGPagPlazoType {
    /** D502: Fecha de vencimiento de la fracción */
    dFecItPlazo: Date;
    /** D504: Informaciones de interés del emitente con respeto a  esta fracción de pago */
    dInfPagPlazo?: string;
    /** D501: Número secuencial de cada fracción de pago a plazo */
    dSecItem: number;
    /** D503: Valor de la fracción */
    dValItPlazo: number;
}

interface gTotTypeGRetencType {
    /** D401: Código de Retención a aplicar */
    cCodRetenc: gTotTypeGRetencTypeCCodRetencType;
    /** D402: Monto de la retención a aplicar */
    cValRetenc: number;
}

type gTotTypeGRetencTypeCCodRetencType = ("1" | "2" | "3" | "4" | "7" | "8");

export enum TiempoPago{
    Inmediato = 1,
    Plazo = 2,
    Mixto = 3,
}

export enum OtrosImpuestos{
    Suma911 = 1,
    TasaPortabilidadNumérica    = 2,
}

/** Definición de tipo para el grupo:
  * D01: Grupo con información de subtotales y totales */
interface gTotType {
    /** D13: Número total de ítems de la factura */
    dNroItems: number;
    /** D07: Valor del acarreo cobrado en el precio total */
    dTotAcar?: number;
    /** D06: Suma de los descuentos y bonificaciones concedidos sobre el valor total de la factura */
    dTotDesc?: number;
    /** D05: Suma total de monto gravado */
    dTotGravado: number;
    /** D04: Total del ISC */
    dTotISC?: number;
    /** D03: Total del ITBMS */
    dTotITBMS: number;
    /** D02: Suma de los precios antes de impuesto */
    dTotNeto: number;
    /** D10: Suma de los valores recibidos */
    dTotRec: number;
    /** D08: Valor del seguro cobrado en el precio total */
    dTotSeg?: number;
    /** D09: Valor total de la factura */
    dVTot: number;
    /** D14: Suma total de los ítems con los montos de los impuestos */
    dVTotItems: number;
    /** D11: Vuelto entregado al cliente */
    dVuelto?: number;
	/** Definición de tipo para el grupo:
	  * D20: Grupo de datos de que describen descuentos o bonificaciones adicionales aplicados a la factura */
    gDescBonif?: gTotTypeGDescBonifType[];
	/** Definición de tipo para el grupo:
	  * D30: Grupo de formas de pago de la factura */
    gFormaPago: FormaPagoType[];
    /** D60:Grupo de Total Otras Tasas o Impuestos (OTI) del Item */
    gOTITotal?: gTotTypeGOTITotalType[];
	/** Definición de tipo para el grupo:
	  * D50: Grupo de informaciones de pago a plazo */
    gPagPlazo?: gTotTypeGPagPlazoType[];
	/** Definición de tipo para el grupo:
	  * D40: Grupo datos cuando a la factura aplican retenciones */
    gRetenc?: gTotTypeGRetencType;
    /** D12: Tiempo de pago */
    iPzPag: TiempoPago;
}

export class Totales implements gTotType {

    @IsNumber({
        maxDecimalPlaces: 2
    })
    dNroItems: number;

    @IsNumber({
        maxDecimalPlaces: 2
    })
    dTotAcar?: number;


    @IsNumber({
        maxDecimalPlaces: 2
    })
    dTotDesc?: number;

    @IsNumber({
        maxDecimalPlaces: 2
    })
    dTotGravado: number;

    @IsNumber({
        maxDecimalPlaces: 2
    })
    dTotISC?: number;
    
    @IsNumber({
        maxDecimalPlaces: 2
    })
    dTotITBMS: number;
    
    
    @IsNumber({
        maxDecimalPlaces: 2
    })
    dTotNeto: number;
    
    @IsNumber({
        maxDecimalPlaces: 2
    })
    dTotRec: number;
    
    @IsNumber({
        maxDecimalPlaces: 2
    })
    dTotSeg?: number;
    
    @IsNumber({
        maxDecimalPlaces: 2
    })
    dVTot: number;
   
    @IsNumber({
        maxDecimalPlaces: 2
    })
    dVTotItems: number;
    
    @IsNumber({
        maxDecimalPlaces: 2
    })
    dVuelto?: number;
    gDescBonif?: gTotTypeGDescBonifType[];
    @IsDefined()
    gFormaPago: FormaPagoType[];
    gOTITotal?: gTotTypeGOTITotalType[];
    gPagPlazo?: gTotTypeGPagPlazoType[];
    gRetenc?: gTotTypeGRetencType;
    @IsDefined()
    iPzPag: TiempoPago;

    public static toXmlObject?(instance: Totales, parent: XMLBuilder) {

        // let node = parent.ele('gEmis');
        // node = RucType.toXmlObject(instance.gRucEmi, 'gRucEmi', parent).up();
        // node = CodigoUbicacionType.toXmlObject(instance.gUbiEm, 'gUbiEm', parent).up();
        // node.ele('dNombEm').txt(instance.dNombEm).up()
        //     .ele('dCoordEm').txt(instance.dCoordEm).up()
        //     .ele('dDirecEm').txt(instance.dDirecEm).up()
        //     .ele('gUbiEm').ele(instance.gUbiEm).up();


        // if (instance.dTfnEm) {
        //     instance.dTfnEm.forEach(i => {
        //         node = node.ele('dTfnEm').txt(i).up();
        //     });
        // }
        // if (instance.dCorElecEmi) {
        //     instance.dCorElecEmi.forEach(i => {
        //         node = node.ele('dCorElecEmi').txt(i).up();
        //     });
        // }
        // return node;
        return null;
    }

}
