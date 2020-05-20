import { RucType } from "./RucType";
import { CodigoUbicacionType } from "./CodigoUbicacionType";
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
export declare class Emisor {
    gRucEmi: RucType;
    dNombEm: string;
    dSucEm: string;
    dCoordEm: string;
    dDirecEm: string;
    gUbiEm: CodigoUbicacionType;
    dTfnEm: string[];
    dCorElecEmi?: string[];
    static toXmlObject?(instance: Emisor, parent: XMLBuilder): XMLBuilder;
}
