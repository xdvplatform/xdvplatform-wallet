import { IsArray, ArrayMaxSize, IsNumber, IsDefined } from 'class-validator';
import { RefNodeSchema } from './AccountNodeSchema';

export enum EventType {
    add,
    update,
    share,
    sign,
    encrypt,
    tag
}
export class LogNodeSchema {

    @IsNumber()
    @IsDefined()
    public timestamp: number;

    @IsDefined()
    public eventType: keyof typeof EventType;

    @IsDefined()
    public userDid: string;


    public log: string;


}