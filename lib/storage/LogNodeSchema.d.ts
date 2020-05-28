export declare enum EventType {
    add = 0,
    update = 1,
    share = 2,
    sign = 3,
    encrypt = 4,
    tag = 5
}
export declare class LogNodeSchema {
    timestamp: number;
    eventType: keyof typeof EventType;
    userDid: string;
    log: string;
}
