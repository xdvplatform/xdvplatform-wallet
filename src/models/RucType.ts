import { Matches, IsEnum } from 'class-validator';
import { TipoRuc } from './DGen';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
export class RucType {
    @IsEnum(TipoRuc)
    public dTipoRuc: TipoRuc;
    @Matches('(([P][E][-](([-]|[0-9]){1,17})|[N][-](([-]|[0-9]){1,18})|[E][-](([-]|[0-9]){1,18})|(([-]|[0-9]){5,20}))|(((([0-9]{1})[-][A][V][-](([-]|[0-9]){1,15}))|(([0-9]{2})[-][A][V][-](([-]|[0-9]){1,14})))|((([0-9]{1,2})[-][N][T][-](([-]|[0-9]){1,15}))|(([0-9]{1,2})[-][N][T][-](([-]|[0-9]){1,14}))|([N][T][-](([-]|[0-9]){1,14}))|(([0-9]{1,2})[-][P][I][-](([-]|[0-9]){1,14}))|([P][I][-](([-]|[0-9]){1,14}))|(([0-9]){1,2}[P][I][-](([-]|[0-9]){1,14})))))?')
    public dRuc: string;
    @Matches('[0-9]{2}')
    public dDV: string;

    public static toXmlObject(instance: RucType, name: string,  parent: XMLBuilder) {

        let node = parent.ele(name)
        .ele('dDV').txt(instance.dDV).up()
        .ele('dRuc').txt(instance.dRuc).up()
        .ele('dTipoRuc').txt(instance.dTipoRuc.toFixed()).up();
        return node;
    }
}
