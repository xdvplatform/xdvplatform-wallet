import { DIDDocument } from '../did';
export interface LogBlockReference {
    cids: string[];
    timestamp: number;
}
export interface DIDBlockReference {
    cid: string;
    tag: string;
}
export interface DocumentBlockReference {
    cid: string;
    tag: string;
}
export declare class LoggableNode {
    cid: string;
    cidLog: string;
}
export declare const generateRandomString: () => string;
export declare class IpldClient {
    ipfsClient: any;
    private graph;
    private signer;
    private ipfsPath;
    constructor();
    initialize(): Promise<void>;
    /**
     * Returns a node filter by cid and path
     * @param cid Content Id
     * @param path  Path
     */
    flush(node: any): any;
    set(a: any, b: any): any;
    /**
     * Returns a node filter by cid and path
     * @param cid Content Id
     * @param path  Path
     */
    getNode(cid: string, path: string): any;
    /**
     * List trees in a cid and returns an array of paths
     * @param cid Content Id
     */
    listTree(cid: string): Promise<any[]>;
    /**
     * Creates a node in ipld
     * @param documentPayload An object payload
     */
    createNode(documentPayload: object, cid?: string): string;
    createDidNode(did: DIDDocument, tag: string): Promise<LoggableNode>;
    appendDocumentNode(didCid: string, document: any, tag: string): Promise<LoggableNode>;
    setSigner(signerFun: (a: string) => Promise<string>): void;
    private updateRoot;
    patchBlock(currentRef: string | null, did?: DIDBlockReference[], document?: DocumentBlockReference[], log?: LogBlockReference[]): Promise<string>;
}
