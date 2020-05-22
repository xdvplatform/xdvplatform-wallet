import { MaxLength, ArrayMaxSize, Matches, ValidateNested, ArrayMinSize, IsNumber, IsDefined, IsOptional } from 'class-validator';
import { RucType } from "./RucType";
import { CodigoUbicacionType } from "./CodigoUbicacionType";
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import moment from 'moment';


export class Bonificaciones {
    /** D200: Descripción de descuentos o bonificaciones adicionales aplicados a la factura */
    dDetalDesc: string;
    /** D201: Monto Descuentos/Bonificaciones y otros ajustes */
    dValDesc: number;
}

export class FormaPagoType {
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
export class OtrosImpuestosTasas {
    /** D601:Código de Otras Tasas o Impuesto del total del ítem */
    dCodOTITotal: OtrosImpuestos;
    /** D602:Monto de Otras Tasas o Impuesto del total del ítem */
    dValOTITotal: number;
}


export class VencimientoPago {
    /** D502: Fecha de vencimiento de la fracción */
    dFecItPlazo: Date;
    /** D504: Informaciones de interés del emitente con respeto a  esta fracción de pago */
    dInfPagPlazo?: string;
    /** D501: Número secuencial de cada fracción de pago a plazo */
    dSecItem: number;
    /** D503: Valor de la fracción */
    dValItPlazo: number;
}

export class Retencion {
    /** D401: Código de Retención a aplicar */
    cCodRetenc: CodigoRetencion;
    /** D402: Monto de la retención a aplicar */
    cValRetenc: number;
}

export enum CodigoRetencion {
    PagoServicioProfesionalEstado100Porc = 1,
    PagoVentaBienesServiciosEstado50Porc = 2,
    PagoNoDomiciliadoEmpresaConstituidaExterior100Porc = 3,
    PagoCompraBienesServicios50Porc = 4,
    PagoComercionAfiliadoSistemaTC_TD50Porc = 7,
    Otros = 8
}

export enum TiempoPago {
    Inmediato = 1,
    Plazo = 2,
    Mixto = 3,
}

export enum OtrosImpuestos {
    Suma911 = 1,
    TasaPortabilidadNumérica = 2,
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
      gDescBonif?: Bonificaciones[];
	/** Definición de tipo para el grupo:
	  * D30: Grupo de formas de pago de la factura */
    gFormaPago: FormaPagoType[];
    /** D60:Grupo de Total Otras Tasas o Impuestos (OTI) del Item */
    gOTITotal?: OtrosImpuestosTasas[];
	/** Definición de tipo para el grupo:
	  * D50: Grupo de informaciones de pago a plazo */
    gPagPlazo?: VencimientoPago[];
	/** Definición de tipo para el grupo:
	  * D40: Grupo datos cuando a la factura aplican retenciones */
    gRetenc?: Retencion;
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
    @IsOptional()
    dTotAcar?: number;


    @IsNumber({
        maxDecimalPlaces: 2
    })
    @IsOptional()
    dTotDesc?: number;

    @IsNumber({
        maxDecimalPlaces: 2
    })
    dTotGravado: number;

    @IsNumber({
        maxDecimalPlaces: 2
    })
    @IsOptional()
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
    @IsOptional()
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
    @IsOptional()
    dVuelto?: number;

    @ArrayMaxSize(5)
    @ValidateNested()
    @IsOptional()
    gDescBonif?: Bonificaciones[];
    
    @IsDefined()    
    @ArrayMaxSize(10)
    @ValidateNested()
    gFormaPago: FormaPagoType[];
    
    @ValidateNested()
    @IsOptional()
    gOTITotal?: OtrosImpuestosTasas[];
    
    @ArrayMaxSize(99)
    @IsOptional()
    @ValidateNested()
    gPagPlazo?: VencimientoPago[];
    
    @ValidateNested()
    @IsOptional()
    gRetenc?: Retencion;

    @ValidateNested()
    @IsDefined()
    iPzPag: TiempoPago;

    public static toXmlObject?(instance: Totales, parent: XMLBuilder) {

        let node = parent.ele('gTot');
        node.ele('iPzPag').txt(instance.iPzPag.toFixed()).up()
            .ele('dNroItems').txt(instance.dNroItems.toFixed(2)).up()
            .ele('dTotITBMS').txt(instance.dTotITBMS.toFixed(2)).up()
            .ele('dTotNeto').txt(instance.dTotNeto.toFixed(2)).up()
            .ele('dTotRec').txt(instance.dTotRec.toFixed(2)).up()
            .ele('dTotGravado').txt(instance.dTotGravado.toFixed(2)).up()
            .ele('dVTot').txt(instance.dVTot.toFixed(2)).up()
            .ele('dVTotItems').txt(instance.dVTotItems.toFixed(2)).up()
            .ele('dVuelto').txt(instance.dVuelto.toFixed(2)).up()


        if (instance.dTotAcar) {
            node = node.ele('dTotAcar').txt(instance.dTotAcar.toFixed(2)).up();
        }


        if (instance.dTotDesc) {
            node = node.ele('dTotDesc').txt(instance.dTotDesc.toFixed(2)).up();
        }


        if (instance.dTotISC) {
            node = node.ele('dTotISC').txt(instance.dTotISC.toFixed(2)).up();
        }


        if (instance.dTotSeg) {
            node = node.ele('dTotSeg').txt(instance.dTotSeg.toFixed(2)).up();
        }


        if (instance.gRetenc) {
            node = node.ele('gRetenc')
                .ele('cCodRetenc').txt(instance.gRetenc.cCodRetenc.toFixed()).up()
                .ele('cValRetenc').txt(instance.gRetenc.cValRetenc.toFixed(2)).up()
        }


        if (instance.gPagPlazo) {
            instance.gPagPlazo.map(i => {
                node = node.ele('gPagPlazo')
                    .ele('dFecItPlazo').txt(moment(i.dFecItPlazo).format()).up()
                    .ele('dSecItem').txt(i.dSecItem.toFixed()).up()
                    .ele('dValItPlazo').txt(i.dValItPlazo.toFixed(2)).up();

                if (i.dInfPagPlazo) {
                    node = node.ele('dInfPagPlazo').txt(i.dInfPagPlazo).up();
                }
            });
        }


        if (instance.gOTITotal) {
            instance.gOTITotal.map(i => {
                node = node.ele('gOTITotal')
                    .ele('dCodOTITotal').txt(i.dCodOTITotal.toFixed()).up()
                    .ele('dValOTITotal').txt(i.dValOTITotal.toFixed(2)).up();
            });
        }

        if (instance.gDescBonif) {
            instance.gDescBonif.map(i => {
                node = node.ele('gDescBonif')
                    .ele('dDetalDesc').txt(i.dDetalDesc).up()
                    .ele('dValDesc').txt(i.dValDesc.toFixed(2)).up();
            });
        }

        return node;

    }

}
