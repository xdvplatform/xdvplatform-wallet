import { DIDDocument } from '../did';
export declare class DIDNodeSchema extends DIDDocument {
    tag: string;
    static create(did: DIDDocument, tag: string): {
        tag: string;
        id: string;
        publicKey: import("..").PublicKey[];
        authentication?: import("..").Authentication[];
        uportProfile?: any;
        service?: import("..").ServiceEndpoint[];
        created: Date;
        updated: Date;
    };
}
