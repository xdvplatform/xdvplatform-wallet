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


    public toXmlObject?(parent: XMLBuilder) {

        let node = parent.ele('gEmis');
        node = this.gRucEmi.toXmlObject('gRucEmi', parent).up();
        node = this.gUbiEm.toXmlObject('gUbiEm', parent).up();
        node.ele('dNombEm').txt(this.dNombEm).up()
            .ele('dCoordEm').txt(this.dCoordEm).up()
            .ele('dDirecEm').txt(this.dDirecEm).up()
            .ele('gUbiEm').ele(this.gUbiEm).up();


        if (this.dTfnEm) {
            this.dTfnEm.forEach(i => {
                node = node.ele('dTfnEm').txt(i).up();
            });
        }
        if (this.dCorElecEmi) {
            this.dCorElecEmi.forEach(i => {
                node = node.ele('dCorElecEmi').txt(i).up();
            });
        }
        return node;
    }

}
