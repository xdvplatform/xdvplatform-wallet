import { Unidades } from './Unidades';
import { CatBienes } from './CatBienes';
import { DescBienes } from './DescBienes';

import moment from 'moment';
import { MaxLength, ArrayMaxSize, Matches, ValidateNested, ArrayMinSize, IsDefined, IsNumber, IsOptional, IsEnum, IsIn } from 'class-validator';
import { RucType } from "./RucType";
import { CodigoUbicacionType } from "./CodigoUbicacionType";
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import { type } from 'os';


export enum TasaISC {
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
    TasaBebidas = 0.00,
    /** Impuesto Selectivo al Consumo de Cervezas(B/. 0.1325 por litro según detalle) */
    Tasa13_20c = 0.1325,
    /** Impuesto Selectivo al Consumo de Cigarrillos y tabacos */
    Tasa32_50c = 0.325,
    /** Impuesto Selectivo al Consumo de Licores */
    Tasa3_50c = 0.035,
    /**  Impuesto Selectivo al Consumo de Minería no metálica*/
    TasaMineriaNoMetalica = 0.00
}
export enum TasaITBMS {
    TasaExonerado = '00',
    Tasa7Porc_Regular = '01',
    Tasa10Porc_Alcoholes = '02',
    Tasa15Porc_Cigarrillos = '03',
}
export class ITBMS {
    public dTasaITBMS: TasaITBMS;

    @IsNumber()
    public dValITBMS: number;
}
export class CodigoItem {
    @IsNumber()
    dGTINCom: number;
    
    @IsNumber()
    dCantGTINCom: number;
    
    @IsNumber()
    dGTINInv: number;
    
    @IsNumber()
    dCantComInvent: number;
}

export class Precio {
    @IsNumber()
    dPrUnit: number;
    
    @IsNumber()
    @IsOptional()
    dPrUnitDesc?: number;
    
    @IsNumber()
    dPrItem: number;
    
    @IsNumber()
    @IsOptional()
    dPrAcarItem?: number;
    
    @IsNumber()
    @IsOptional()
    dPrSegItem?: number;
    @IsNumber()
    dValTotItem: number;
}
export class ISC {
    public dTasaISC: TasaISC;

    @IsNumber()
    public dValISC: number;
}
export class Item {
    constructor() {
        this.gCodItem = null;
        this.gISCItem = null;
        this.gITBMSItem = new ITBMS();
        this.gPrecios = new Precio();
    }
    @MaxLength(4)
    public dSecItem: number;

    /**
     *    C03:Descripción del producto o servicio
     * 
     */
    @MaxLength(500)
    public dDescProd: string;

    /**
     * Codigo interno del item
     */
    @MaxLength(20)
    @IsOptional()
    public dCodProd?: string;

    /**
     *   C05:Unidad de medida del código interno
     *  
     */
    @IsOptional()
    public cUnidad?: string;


    /**
     *    C06:Cantidad del producto o servicio en la unidad de medida del código interno
     */
    //@Matches(`^[0-9]{1,9}([.][0-9]{0,6})?`)
    @IsNumber()
    public cCantCodInt: number;

    /**
     *    C07:Fecha de fabricación/elaboración
     * 
     */
    @IsOptional()
    public dFechaFab?: Date | string;  // \d{4}-\d\d-\d\d


    /*
    *   C08:Fecha de caducidad
     * 
     */
    @IsOptional()
    public dFechaCad?: Date | string; // \d{4}-\d\d-\d\d


    /**
     *    C09:Código del Ítem en la Codificación Panameña de Bienes y Servicios Abreviada
     * 
     */
    @IsOptional()
    public dCodCPBSabr?: string;

    /**
     *    C10:Código del Ítem en la Codificación Panameña de Bienes y Servicios
     * 
     */
    @IsOptional()
    public dCodCPBScmp?: string;

    /**
     *    C11:Unidad de medida en la Codificación Panameña de Bienes y Servicios
     * 
     */
    @IsOptional()
    public cUnidadCPBS?: string;

    /**
     *           C19:Informaciones de interés del emitente con respeto a un ítem de la FE
     */
    @MaxLength(5000)
    @IsOptional()
    public dInfEmFE?: string;

    @IsDefined()
    @ValidateNested()
    public gPrecios: Precio;


    @IsOptional()
    @ValidateNested()
    public gCodItem?: CodigoItem;

    @IsDefined()
    @ValidateNested()
    public gITBMSItem: ITBMS;

    @IsOptional()
    @ValidateNested()
    public gISCItem?: ISC;




    public static toXmlObject?(instance: Item, parent: XMLBuilder) {

        let node = parent.ele('gItem');
        node.ele('cCantCodInt').txt(instance.cCantCodInt.toFixed()).up()
            .ele('dDescProd').txt(instance.dDescProd).up()
            .ele('dSecItem').txt(instance.dSecItem.toFixed()).up()

        node = node.ele('gPrecios')
            .ele('dPrItem').txt(instance.gPrecios.dPrItem.toFixed()).up()
            .ele('dPrUnit').txt(instance.gPrecios.dPrUnit.toFixed()).up()
            .ele('dValTotItem').txt(instance.gPrecios.dValTotItem.toFixed()).up()

        node = node.ele('gITBMSItem')
            .ele('dTasaITBMS').txt(instance.gITBMSItem.dTasaITBMS).up()
            .ele('dValITBMS').txt(instance.gITBMSItem.dValITBMS.toFixed()).up()


        if (instance.dInfEmFE) {
            node = node.ele('dInfEmFE').txt(instance.dInfEmFE).up();
        }


        if (instance.cUnidadCPBS) {
            node = node.ele('cUnidadCPBS').txt(instance.cUnidadCPBS).up();
        }


        if (instance.dCodCPBScmp) {
            node = node.ele('dCodCPBScmp').txt(instance.dCodCPBScmp).up();
        }


        if (instance.dCodCPBSabr) {
            node = node.ele('dCodCPBSabr').txt(instance.dCodCPBSabr).up();
        }


        if (instance.dCodProd) {
            node = node.ele('dCodProd').txt(instance.dCodProd).up();
        }


        if (instance.dFechaCad) {
            node = node.ele('dFechaCad').txt(moment(instance.dFechaCad).format('YYYY-MM-DD')).up();
        }


        if (instance.dFechaFab) {
            node = node.ele('dFechaFab').txt(moment(instance.dFechaFab).format('YYYY-MM-DD')).up();
        }

        if (instance.cUnidad) {
            node = node.ele('cUnidad').txt(instance.cUnidad).up();
        }


        return node;
    }

}
