import { MinLength, MaxLength, ArrayMaxSize, Matches, IsEnum, ValidateNested } from 'class-validator';
import { TipoReceptor, RucRecType } from './DGen';
import { IdExtType } from "./IdExtType";
import { CodigoUbicacionType } from "./CodigoUbicacionType";
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import { RucType } from './RucType';
export class Receptor {
    /**
     *             ID: B401 - Identifica el tipo de receptor de la FE
     */
    @IsEnum(TipoReceptor)
    public iTipoRec: TipoReceptor;
    /**
     *             402: RUC del Contribuyente Receptor
     */
    @ValidateNested()
    public gRucRec: RucRecType;
    /**
     *             B403: Razón social (persona jurídica) o Nombre y Apellido (persona natural) del receptor de la FE
     */
    @MaxLength(100)
    public dNombRec?: string;
    /**
     *             B404: Dirección del receptor de la FE
     */
    @MaxLength(100)
    public dDirecRec?: string;
    /**
     *             B405: Codigo, Corregimiento, Distrito, Provincia donde se ubica el punto de facturación
     */

    @ValidateNested()
    public gUbiRec?: CodigoUbicacionType;
    /**
     *             B406: Identificación de extranjeros
     */
    public gIdExtType?: IdExtType;
    /**
     *             B408: Teléfono de contacto del receptor de la FE
     */
    @ArrayMaxSize(3)
    @Matches(`[0-9]{3,4}-[0-9]{4}`)
    public dTfnRec: string[];
    /**
     *             B409: Correo electrónico del receptor
     */
    @ArrayMaxSize(3)
    @Matches(`([0-9a-zA-Z#$%]([-.\w]*[0-9a-zA-Z#$%'\\.\\-_])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})`)
    public dCorElecRec?: string[];
    /**
     *  B411: País del receptor de la FE. Debe ser PAN(Panamá) si B15=1 (destino u origen de la operacion es Panamá)
     */
    public cPaisRec: string;
    /**
     *             B411: País del receptor de la FE no existente en la tabla
     */
    @MaxLength(50)
    @MinLength(5)
    public cPaisRecDesc?: string;


    public static toXmlObject(instance: Receptor, parent: XMLBuilder) {

        let node = parent.ele('gDatRec');
        node = RucType.toXmlObject(instance.gRucRec, 'gRucRec', parent).up();
        node = CodigoUbicacionType.toXmlObject(instance.gUbiRec, 'gUbiRec', parent).up();
        node = node.ele('iTipoRec').txt(instance.iTipoRec).up();
        node = node.ele('cPaisRec').txt(instance.cPaisRec).up();


        // if (instance.gIdExtType) {
        //     node = node.ele('gIdExtType').txt(instance.gIdExtType.toXmlObject(node)).up();
        // }
        if (instance.cPaisRecDesc) {
            node = node.ele('cPaisRecDesc').txt(instance.cPaisRecDesc).up();

        }
        if (instance.dNombRec) {
            node = node.ele('dNombRec').txt(instance.dNombRec).up();

        }
        if (instance.dDirecRec) {
            node = node.ele('dDirecRec').txt(instance.dDirecRec).up();

        }
        if (instance.dTfnRec) {
            instance.dTfnRec.forEach(i => {
                node = node.ele('dTfnRec').txt(i).up();
            });
        }
        if (instance.dCorElecRec) {
            instance.dCorElecRec.forEach(i => {
                node = node.ele('dCorElecRec').txt(i).up();
            });
        }
        return node;
    }
}
