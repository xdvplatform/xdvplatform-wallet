import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
export declare class CodigoUbicacionType {
    dCodUbi: string;
    dCorreg?: string;
    dDistr?: string;
    dProv?: string;
    static toXmlObject(instance: CodigoUbicacionType, name: string, parent: XMLBuilder): XMLBuilder;
}
