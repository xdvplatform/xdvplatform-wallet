import { DIDDocument } from '../did';
export declare class DIDNodeSchema extends DIDDocument {
    tag: string;
    static create(did: DIDDocument, tag: string): {
        tag: string;
        id: string;
        publicKey: import("../did").PublicKey[];
        authentication?: import("../did").Authentication[];
        uportProfile?: any;
        service?: import("../did").ServiceEndpoint[];
        created: Date;
        updated: Date;
    };
}
