export declare enum EventType {
    add = 0,
    update = 1,
    share = 2,
    sign = 3,
    encrypt = 4,
    tag = 5
}
export declare class LogNodeSchema {
    static create(parent: string, logType: EventType, log: string): LogNodeSchema & {
        log: string;
        $parent: string;
        eventType: string;
        timestamp: number;
    };
    timestamp: number;
    eventType: keyof typeof EventType;
    log: string;
    $parent: string;
}
