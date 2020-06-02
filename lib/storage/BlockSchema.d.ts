export declare class BlockSchema {
    did: {
        [index: string]: string;
    };
    document: {
        [index: string]: string;
    };
    logs: {
        [index: number]: string[];
    };
    $block?: number;
    $ref?: string;
    $signature: string;
}
