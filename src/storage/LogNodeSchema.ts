import { IsArray, ArrayMaxSize, IsNumber, IsDefined } from 'class-validator';
import moment from 'moment';

export enum EventType {
    add,
    update,
    share,
    sign,
    encrypt,
    tag
}
export class LogNodeSchema {


    public static create(parent: string, logType: EventType, log: string) {
        return Object.assign(new LogNodeSchema(), {
            log,
            $parent: parent,
            eventType: EventType[logType],
            timestamp: moment().unix(),
        });
    }

    @IsNumber()
    @IsDefined()
    public timestamp: number;

    @IsDefined()
    public eventType: keyof typeof EventType;

    public log: string;

    public $parent: string;
    
}