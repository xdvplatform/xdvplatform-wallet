import { TipoRuc } from './DGen';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
export declare class RucType {
    dTipoRuc: TipoRuc;
    dRuc: string;
    dDV: string;
    static toXmlObject(instance: RucType, name: string, parent: XMLBuilder): XMLBuilder;
}
