import { Ubicaciones } from './Ubicaciones';
import { MaxLength } from 'class-validator';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
export class CodigoUbicacionType {
    // Lookup
    public dCodUbi: string;
    @MaxLength(50)
    public dCorreg?: string;
    @MaxLength(50)
    public dDistr?: string;
    @MaxLength(50)
    public dProv?: string;

    public toXmlObject?(name: string,  parent: XMLBuilder) {

        const entry = Object.entries(Ubicaciones).find(([k, v]) => {
            return k === this.dCodUbi;
        });

        if (!entry) {
            throw new Error(`Invalid dCodUbi ${name}.${this.dCodUbi}`)
        }

        const [provincia, distrito, corregimiento] = entry[1].split('-');

        let node = parent.ele(name)
        .ele('dCodUbi').txt(entry[0])
        .ele('dProv').txt(provincia).up()
        .ele('dDistr').txt(distrito).up()
        .ele('dCorreg').txt(corregimiento).up();
        return node;
    }
}
