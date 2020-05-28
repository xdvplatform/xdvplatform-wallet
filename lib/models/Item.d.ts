import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
export declare enum TasaISC {
    /**
     *                      Impuesto Selectivo al Consumo de Gaseosas
                            Impuesto Selectivo al Consumo de Joyas y Armas de Fuego
                            Impuesto Selectivo al Consumo de televisión por cable, microondas y satelital, telefonía móvil
                            Impuesto Selectivo al Consumo de Bebidas Alcohólicas (B/. 0.05 por litro según detalle)
                            Impuesto Selectivo al Consumo de Vinos (B/. 0.05 por litro según detalle)
     */
    Tasa5c = 0.05,
    /** Jarabes, siropes o concentrados */
    Tasa6c = 0.06,
    /** Impuesto Selectivo al Consumo de Bebidas Espirituosas */
    TasaBebidas = 0,
    /** Impuesto Selectivo al Consumo de Cervezas(B/. 0.1325 por litro según detalle) */
    Tasa13_20c = 0.1325,
    /** Impuesto Selectivo al Consumo de Cigarrillos y tabacos */
    Tasa32_50c = 0.325,
    /** Impuesto Selectivo al Consumo de Licores */
    Tasa3_50c = 0.035,
    /**  Impuesto Selectivo al Consumo de Minería no metálica*/
    TasaMineriaNoMetalica = 0
}
export declare enum TasaITBMS {
    TasaExonerado = "00",
    Tasa7Porc_Regular = "01",
    Tasa10Porc_Alcoholes = "02",
    Tasa15Porc_Cigarrillos = "03"
}
export declare class ITBMS {
    dTasaITBMS: TasaITBMS;
    dValITBMS: number;
}
export declare class CodigoItem {
    dGTINCom: number;
    dCantGTINCom: number;
    dGTINInv: number;
    dCantComInvent: number;
}
export declare class Precio {
    dPrUnit: number;
    dPrUnitDesc?: number;
    dPrItem: number;
    dPrAcarItem?: number;
    dPrSegItem?: number;
    dValTotItem: number;
}
export declare class ISC {
    dTasaISC: TasaISC;
    dValISC: number;
}
export declare class Item {
    constructor();
    dSecItem: number;
    /**
     *    C03:Descripción del producto o servicio
     *
     */
    dDescProd: string;
    /**
     * Codigo interno del item
     */
    dCodProd?: string;
    /**
     *   C05:Unidad de medida del código interno
     *
     */
    cUnidad?: string;
    /**
     *    C06:Cantidad del producto o servicio en la unidad de medida del código interno
     */
    cCantCodInt: number;
    /**
     *    C07:Fecha de fabricación/elaboración
     *
     */
    dFechaFab?: Date | string;
    dFechaCad?: Date | string;
    /**
     *    C09:Código del Ítem en la Codificación Panameña de Bienes y Servicios Abreviada
     *
     */
    dCodCPBSabr?: string;
    /**
     *    C10:Código del Ítem en la Codificación Panameña de Bienes y Servicios
     *
     */
    dCodCPBScmp?: string;
    /**
     *    C11:Unidad de medida en la Codificación Panameña de Bienes y Servicios
     *
     */
    cUnidadCPBS?: string;
    /**
     *           C19:Informaciones de interés del emitente con respeto a un ítem de la FE
     */
    dInfEmFE?: string;
    gPrecios: Precio;
    gCodItem?: CodigoItem;
    gITBMSItem: ITBMS;
    gISCItem?: ISC;
    static toXmlObject?(instance: Item, parent: XMLBuilder): XMLBuilder;
}
