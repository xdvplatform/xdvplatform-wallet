import { MaxLength, ArrayMaxSize, Matches, ValidateNested, ArrayMinSize } from 'class-validator';
import { RucType } from "./RucType";
import { CodigoUbicacionType } from "./CodigoUbicacionType";
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
export class Item {
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
    public dCodProd?: string;

    /**
     *   C05:Unidad de medida del código interno
     *  
     */
    public cUnidad?: string;
    
    
    /**
     *    C06:Cantidad del producto o servicio en la unidad de medida del código interno
     */
    @Matches(`^[0-9]{1,9}([.][0-9]{0,6})?`)
    public cCantCodInt: string;

    /**
     *    C07:Fecha de fabricación/elaboración
     * 
     */
    public dFechaFab?: Date | string;  // \d{4}-\d\d-\d\d

    
    /*
    *   C08:Fecha de caducidad
     * 
     */
    public dFechaCad?: Date | string; // \d{4}-\d\d-\d\d

    
    /**
     *    C09:Código del Ítem en la Codificación Panameña de Bienes y Servicios Abreviada
     * 
     */
    public dCodCPBSabr?: string;
    
    /**
     *    C10:Código del Ítem en la Codificación Panameña de Bienes y Servicios
     * 
     */
    public dCodCPBScmp?: string;

    /**
     *    C11:Unidad de medida en la Codificación Panameña de Bienes y Servicios
     * 
     */
    public cUnidadCPBS?: string;

    /**
     *           C19:Informaciones de interés del emitente con respeto a un ítem de la FE
     */
    @MaxLength(5000)
    public dInfEmFE?: string;


    
    public static toXmlObject?(instance: Item, parent: XMLBuilder) {

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
