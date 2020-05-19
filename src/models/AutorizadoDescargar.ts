import { RucType } from './RucType';
import { ValidateNested } from 'class-validator';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
export class AutorizadoDescargar {
    @ValidateNested()
    public gRucAutXML: RucType;
}
