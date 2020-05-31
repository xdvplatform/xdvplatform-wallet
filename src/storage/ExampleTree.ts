import { DIDNodeSchema } from './DIDNodeSchema'
import { DIDDocumentBuilder, DIDDocument } from '../did'
import { DocumentNodeSchema } from './DocumentNodeSchema';
import { LogNodeSchema, EventType } from './LogNodeSchema';

export async function myDocumentTree() {

    const did = await DIDDocumentBuilder
        .createDID({
            issuer: 'idsomething',
            verificationKeys: [],
            authenticationKeys: []
        });

    // initial tree
    const me = <DIDNodeSchema>{
        ...did,
        tag: 'My RSA Key'
    };

    const meCid = 'Qw1'

    // create document
    const document = DocumentNodeSchema.create(meCid, {
        items: {
            item1: 'a',
            item2: 'b'
        }
    });

    // create log
    const log = LogNodeSchema.create(document, EventType.add, 'Added document node');

    
}