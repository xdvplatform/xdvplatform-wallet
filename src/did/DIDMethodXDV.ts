import { DIDDocument, ParsedDID } from './DIDDocument';
import { IpldClient } from './../ipld/IpldClient';


const ID_CHAR = '[a-zA-Z0-9_.-]';
const METHOD = '([a-zA-Z0-9_]+)';
const METHOD_ID = `(${ID_CHAR}+(:${ID_CHAR}+)*)`;
const PARAM_CHAR = '[a-zA-Z0-9_.:%-]';
const PARAM = `;${PARAM_CHAR}+=${PARAM_CHAR}*`;
const PARAMS = `((${PARAM})*)`;
const PATH = `(\/[^#?]*)?`;
const QUERY = `([?][^#]*)?`;
const FRAGMENT = `(\#.*)?`;
const DID_MATCHER = new RegExp(
    `^did:${METHOD}:${METHOD_ID}${PARAMS}${PATH}${QUERY}${FRAGMENT}$`
);
const CID = require('cids');
const multihashing = require('multihashing-async');
const XDV_KEY_NAME = 'temp-xdv-name';
export class DIDMethodXDV {
    constructor(private ipld: any) { }

    /**
     * create IPLD session
     * @param ipld IPLD instance
     * @param pem PEM
     */
    public async createIpldSession(pem: string) {
        const hash = await multihashing(Buffer.from(pem), 'sha2-256');
        const cid = new CID(1, 'dag-pb', hash);
        const key = `did:xdv:${cid}`;

        return {
            key,
        };
    }



    /**
     * getResolver
     * @param ipld IPLD
     * @param cid 
     */
    public async getResolver(cid) {
        return {
            xdv: async (did: string, parsed?: ParsedDID): Promise<DIDDocument | null> => {
                if (!parsed) {
                    parsed = this.parse(did);
                }
                // {method: 'mymethod', id: 'abcdefg', did: 'did:mymethod:abcdefg/some/path#fragment=123', path: '/some/path', fragment: 'fragment=123'}
                const didDoc = await this.ipld.getNode(cid, '/'); // lookup doc
                if (didDoc.value.id === parsed.did) {
                    return didDoc.value;

                } else {
                    throw new Error('Invalid DID document')
                }
            }
        }
    }

    public parse(didUrl: string): ParsedDID {
        if (didUrl === '' || !didUrl) throw new Error('Missing DID')
        const sections = didUrl.match(DID_MATCHER)
        if (sections) {
            const parts: ParsedDID = {
                did: `did:${sections[1]}:${sections[2]}`,
                method: sections[1],
                id: sections[2],
                didUrl
            }
            if (sections[4]) {
                const params = sections[4].slice(1).split(';')
                parts.params = {}
                for (const p of params) {
                    const kv = p.split('=')
                    parts.params[kv[0]] = kv[1]
                }
            }
            if (sections[6]) parts.path = sections[6]
            if (sections[7]) parts.query = sections[7].slice(1)
            if (sections[8]) parts.fragment = sections[8].slice(1)
            return parts
        }
        throw new Error(`Invalid DID ${didUrl}`)
    }
}
