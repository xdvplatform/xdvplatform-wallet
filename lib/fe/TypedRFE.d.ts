import { DGen, Item, Totales } from './models';
export declare class TypedRFE {
    constructor();
    dVerForm: number;
    dId: string;
    gDGen: DGen;
    /**
   *               C01: Grupo de datos que especifica cada ítem del detalle de la transacción
   */
    gItem: Item[];
    /**
     *               C01: Grupo de datos que especifica cada ítem del detalle de la transacción
     */
    gTot: Totales;
}
