import { MaxLength, ArrayMaxSize, Matches, ValidateNested, ArrayMinSize } from 'class-validator';
import { RucType } from "./RucType";
import { CodigoUbicacionType } from "./CodigoUbicacionType";
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
export class Emisor {
    @ValidateNested()
    public gRucEmi: RucType;
    @MaxLength(100)
    public dNombEm: string;
    @Matches('[a-zA-Z0-9]{4}')
    public dSucEm: string;
    @MaxLength(22)
    @Matches('^([-+]?)([\d]{1,2})(((\.)[\d]{4,6}(,)))(-([\d]{2})(\.)[\d]{4,6})$')
    public dCoordEm: string;
    @MaxLength(100)
    public dDirecEm: string;
    @ValidateNested()
    public gUbiEm: CodigoUbicacionType;
    @ArrayMaxSize(3)
    @ArrayMinSize(1)
    @Matches(`[0-9]{3,4}-[0-9]{4}`)
    public dTfnEm: string[];
    @ArrayMaxSize(3)
    @Matches(`([0-9a-zA-Z#$%]([-.\w]*[0-9a-zA-Z#$%'\\.\\-_])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})`)
    public dCorElecEmi?: string[];


    public static toXmlObject?(instance: Emisor, parent: XMLBuilder) {

        let node = parent.ele('gEmis');
        node = RucType.toXmlObject(instance.gRucEmi, 'gRucEmi', parent).up();
        node = CodigoUbicacionType.toXmlObject(instance.gUbiEm, 'gUbiEm', parent).up();
        node.ele('dNombEm').txt(instance.dNombEm).up()
            .ele('dCoordEm').txt(instance.dCoordEm).up()
            .ele('dDirecEm').txt(instance.dDirecEm).up()
            .ele('gUbiEm').ele(instance.gUbiEm).up();


        if (instance.dTfnEm) {
            instance.dTfnEm.forEach(i => {
                node = node.ele('dTfnEm').txt(i).up();
            });
        }
        if (instance.dCorElecEmi) {
            instance.dCorElecEmi.forEach(i => {
                node = node.ele('dCorElecEmi').txt(i).up();
            });
        }
        return node;
    }

}
