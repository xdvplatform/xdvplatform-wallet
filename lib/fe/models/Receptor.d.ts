import { TipoReceptor, RucRecType } from './DGen';
import { IdExtType } from "./IdExtType";
import { CodigoUbicacionType } from "./CodigoUbicacionType";
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
export declare class Receptor {
    /**
     *             ID: B401 - Identifica el tipo de receptor de la FE
     */
    iTipoRec: TipoReceptor;
    /**
     *             402: RUC del Contribuyente Receptor
     */
    gRucRec: RucRecType;
    /**
     *             B403: Razón social (persona jurídica) o Nombre y Apellido (persona natural) del receptor de la FE
     */
    dNombRec?: string;
    /**
     *             B404: Dirección del receptor de la FE
     */
    dDirecRec?: string;
    /**
     *             B405: Codigo, Corregimiento, Distrito, Provincia donde se ubica el punto de facturación
     */
    gUbiRec?: CodigoUbicacionType;
    /**
     *             B406: Identificación de extranjeros
     */
    gIdExtType?: IdExtType;
    /**
     *             B408: Teléfono de contacto del receptor de la FE
     */
    dTfnRec: string[];
    /**
     *             B409: Correo electrónico del receptor
     */
    dCorElecRec?: string[];
    /**
     *  B411: País del receptor de la FE. Debe ser PAN(Panamá) si B15=1 (destino u origen de la operacion es Panamá)
     */
    cPaisRec: string;
    /**
     *             B411: País del receptor de la FE no existente en la tabla
     */
    cPaisRecDesc?: string;
    static toXmlObject(instance: Receptor, parent: XMLBuilder): XMLBuilder;
}
