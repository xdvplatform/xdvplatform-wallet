import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
export declare class Bonificaciones {
    /** D200: Descripción de descuentos o bonificaciones adicionales aplicados a la factura */
    dDetalDesc: string;
    /** D201: Monto Descuentos/Bonificaciones y otros ajustes */
    dValDesc: number;
}
export declare class FormaPagoType {
    /** D302: Descripción de forma de pago no listada en el formato */
    dFormaPagoDesc?: string;
    /** D303: Valor de la fracción pagada utilizando esta forma de pago */
    dVlrCuota: number;
    /** D301: Forma de pago de la factura */
    iFormaPago: FormaPago;
}
export declare enum FormaPago {
    Credito = "01",
    Contado = "02",
    TarjetaCredito = "03",
    TarjetaDebito = "04",
    TarjetaFidelidad = "05",
    ValeDevolucion = "06",
    ValeRegalo = "07",
    ACH = "08",
    Otro = "99"
}
export declare class OtrosImpuestosTasas {
    /** D601:Código de Otras Tasas o Impuesto del total del ítem */
    dCodOTITotal: OtrosImpuestos;
    /** D602:Monto de Otras Tasas o Impuesto del total del ítem */
    dValOTITotal: number;
}
export declare class VencimientoPago {
    /** D502: Fecha de vencimiento de la fracción */
    dFecItPlazo: Date;
    /** D504: Informaciones de interés del emitente con respeto a  esta fracción de pago */
    dInfPagPlazo?: string;
    /** D501: Número secuencial de cada fracción de pago a plazo */
    dSecItem: number;
    /** D503: Valor de la fracción */
    dValItPlazo: number;
}
export declare class Retencion {
    /** D401: Código de Retención a aplicar */
    cCodRetenc: CodigoRetencion;
    /** D402: Monto de la retención a aplicar */
    cValRetenc: number;
}
export declare enum CodigoRetencion {
    PagoServicioProfesionalEstado100Porc = 1,
    PagoVentaBienesServiciosEstado50Porc = 2,
    PagoNoDomiciliadoEmpresaConstituidaExterior100Porc = 3,
    PagoCompraBienesServicios50Porc = 4,
    PagoComercionAfiliadoSistemaTC_TD50Porc = 7,
    Otros = 8
}
export declare enum TiempoPago {
    Inmediato = 1,
    Plazo = 2,
    Mixto = 3
}
export declare enum OtrosImpuestos {
    Suma911 = 1,
    TasaPortabilidadNumérica = 2
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
export declare class Totales implements gTotType {
    dNroItems: number;
    dTotAcar?: number;
    dTotDesc?: number;
    dTotGravado: number;
    dTotISC?: number;
    dTotITBMS: number;
    dTotNeto: number;
    dTotRec: number;
    dTotSeg?: number;
    dVTot: number;
    dVTotItems: number;
    dVuelto?: number;
    gDescBonif?: Bonificaciones[];
    gFormaPago: FormaPagoType[];
    gOTITotal?: OtrosImpuestosTasas[];
    gPagPlazo?: VencimientoPago[];
    gRetenc?: Retencion;
    iPzPag: TiempoPago;
    static toXmlObject?(instance: Totales, parent: XMLBuilder): XMLBuilder;
}
export {};
