import { MaxLength } from 'class-validator';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
export class IdExtType {
    @MaxLength(50)
    public dIdExt: string;
    @MaxLength(100)
    public dPaisExt: string;


    public toXmlObject?(parent: XMLBuilder) {
        let node = parent.ele('gIdExtType')
        .ele('dIdExt').txt(this.dIdExt).up()
        .ele('dPaisExt').txt(this.dPaisExt).up()
        return node;
    }
}
