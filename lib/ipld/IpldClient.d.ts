export declare const generateRandomString: () => string;
export declare class IpldClient {
    private universalResolver?;
    private lifetime;
    private ipfsClient;
    private ipid;
    private ipfsPath;
    constructor(universalResolver?: any, lifetime?: string);
    getIpidDidResolver(): {
        ipid: (id: string) => Promise<any>;
    };
    setUniversalResolver(resolver: any): void;
    resolveDID(id: string): Promise<any>;
    getDID(pem: string): Promise<any>;
    createDID(pem: string): Promise<any>;
    private publish;
    private removeKey;
    private importKey;
    private generateKeyName;
    updateDID(pem: string, publicKeys: []): Promise<void>;
    initialize(): Promise<void>;
    /**
     * Returns a node filter by cid and path
     * @param cid Content Id
     * @param path  Path
     */
    getNode(cid: string, path: string): Promise<any>;
    /**
     * List trees in a cid and returns an array of paths
     * @param cid Content Id
     */
    listTree(cid: string): Promise<any[]>;
    /**
     * Creates a node in ipld
     * @param documentPayload An object payload
     */
    createNode(documentPayload: object): Promise<any>;
}
