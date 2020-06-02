export declare type NodeType = 'child' | 'document';
export declare class DocumentNodeSchema {
    static create(did: string, document: any, tag: string): any;
    tag: string;
    '$did': string;
}
