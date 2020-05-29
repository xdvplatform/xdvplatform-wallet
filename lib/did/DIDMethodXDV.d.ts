import { DIDDocument, ParsedDID } from './DIDDocument';
export declare class DIDMethodXDV {
    private ipld;
    constructor(ipld: any);
    /**
     * create IPLD session
     * @param ipld IPLD instance
     * @param pem PEM
     */
    createIpldSession(pem: string): Promise<{
        key: string;
    }>;
    /**
     * getResolver
     * @param ipld IPLD
     * @param cid
     */
    getResolver(cid: any): Promise<{
        xdv: (did: string, parsed?: ParsedDID) => Promise<DIDDocument | null>;
    }>;
    parse(didUrl: string): ParsedDID;
}
