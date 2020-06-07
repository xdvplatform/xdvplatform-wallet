import moment from 'moment';
import {
    BlockSchema,
    DIDNodeSchema,
    DocumentNodeSchema,
    EventType,
    LogNodeSchema
    } from '../storage';
import { DIDDocument } from '../did';

export interface LogBlockReference{
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

export class LoggableNode{
    cid: string;
    cidLog: string;
}

export const generateRandomString = () =>
    Math.random()
        .toString(36)
        .substring(2);

const IPFS = require('ipfs');
const { DAGNode } = require('ipld-dag-pb');
const Graph = require('ipld-graph-builder');

const DEFAULT_CONTEXT = 'https://w3id.org/did/v1';

export class IpldClient {
    public ipfsClient;
    private graph: any;
    private signer: (a: string) => Promise<string>;
    private ipfsPath: string;
    constructor() {

    }

    public async initialize(config: any = null) {
        this.ipfsPath = '/tmp/ipfs' + Math.random()
        const ipfs = IPFS.create({
            pass: "01234567890123456789",
            repo: this.ipfsPath,
            config: config || {
                Addresses: {
                    Swarm: [
                        "/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star",
                        '/ip4/0.0.0.0/tcp/0'
                    ],
                    API: '/ip4/127.0.0.1/tcp/0',
                    Gateway: '/ip4/127.0.0.1/tcp/0'
                },
                Discovery: {
                    // MDNS: {
                    //     Enabled: true,
                    //     Interval: 10
                    // },
                    webRTCStar: {
                        Enabled: true
                    }
                },
                "Bootstrap": [
                    "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
                    "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
                    "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
                    "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
                    "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ"
                ],
                AutoNAT: {},
                Pubsub: {
                    Router: "gossipsub"
                },
                EXPERIMENTAL: {
                    pubsub: true
                }

            }
        })

        this.ipfsClient = await ipfs;
        this.graph = new Graph(this.ipfsClient.dag);
    }

    /**
     * Returns a node filter by cid and path
     * @param cid Content Id
     * @param path  Path
     */
    public flush(node) {
        return this.graph.flush(node);
    }

    public set(a: any, b: any) {
        return this.graph.set(a, b);
    }

    /**
     * Returns a node filter by cid and path
     * @param cid Content Id
     * @param path  Path
     */
    public getNode(cid: string, path: string) {
        return this.ipfsClient.dag.get(cid, path)
    }


    /**
     * List trees in a cid and returns an array of paths
     * @param cid Content Id
     */
    public async listTree(cid: string) {
        let paths = [];
        for await (const path of this.ipfsClient.dag.tree(cid, { recursive: true })) {
            paths = [...paths, path];
        }
        return paths;
    }

    /**
     * Creates a node in ipld
     * @param documentPayload An object payload
     */
    public createNode(documentPayload: object, cid?: string): string {
        if (cid) {
            return this.ipfsClient.dag.put(documentPayload, { cid, pin: true })
        } else {
            return this.ipfsClient.dag.put(documentPayload, { format: 'dag-cbor', hashAlg: 'sha2-256', pin: true })
        }
    }

    public async createDidNode(did: DIDDocument, tag: string): Promise<LoggableNode> {
        // initial tree
        const didNode = DIDNodeSchema.create(did, 'rsa_key_for_documens');
        const cid = await this.createNode(didNode);

        // create log
        const log = LogNodeSchema.create(cid, EventType.add, `DID node created for ${did.id}`);
        const logCid = await this.createNode(log);

        return {
            cid: cid.toString(),
            cidLog: logCid.toString(),
        }
    }


    public async appendDocumentNode(didCid: string, document: any, tag: string): Promise<LoggableNode> {

        // create document
        const docCid = DocumentNodeSchema.create(didCid, {
            ...document
        }, tag);
        const cid = await this.createNode(docCid);

        // create log
        const log = LogNodeSchema.create(cid, EventType.add, `Document node appended`);
        const logCid = await this.createNode(log);

        return {
            cid: cid.toString(),
            cidLog: logCid.toString(),
        }
    }

    public setSigner(signerFun: (a: string) => Promise<string>) {
        this.signer = signerFun;
    }

    private async updateRoot(lastCid: string, rootPatch: BlockSchema): Promise<string> {
        let root: any = {};
        if (lastCid === null) {
            root = {
                did: {
                    ...rootPatch.did,
                },
                document: {
                    ...rootPatch.document,
                }, logs: {
                    ...rootPatch.logs
                },
                $block: 0,
                $ref: undefined,
            };
        } else {
            const { value } = await this.getNode(lastCid, '/');
            const b = value.$block + 1;
            root = {
                did: {
                    ...value.did,
                    ...rootPatch.did,
                },
                document: {
                    ...value.document,
                    ...rootPatch.document,
                }, logs: {
                    ...value.logs,
                    ...rootPatch.logs
                },
                $block: b,
                $ref: lastCid,
            };
        }

        const signature = await this.signer(JSON.stringify(root));
        root.$signature = signature;
        return await this.createNode(root);
    }

    public async patchBlock(currentRef: string | null, did: DIDBlockReference[] = [],
        document: DocumentBlockReference[] = [],
        log: LogBlockReference[] = []) {
        let block: BlockSchema = new BlockSchema();
        if (currentRef !== null) {
            block = await this.getNode(currentRef, '/');
        }
        if (this.signer === null) {
            throw new Error('Missing signer');
        }

        // DID
        let tempDid: any = {
            ...block.did,
        };
        did.forEach(({ cid, tag }) => {
            tempDid = {
                ...tempDid,
                [tag]: cid
            }
        });


        // Document
        let tempDoc: any = {
            ...block.document,
        };
        document.forEach(({ cid, tag }) => {
            tempDoc = {
                ...tempDoc,
                [tag]: cid
            }
        });


        // Log
        let tempLog: any = {
            ...block.logs,
        };
        log.forEach(({ cids, timestamp }) => {
            tempLog = {
                ...tempLog,
                [timestamp]: [...cids]
            }
        });


        const rootNode = <BlockSchema>{
            did: {
                ...tempDid
            },
            document: {
                ...tempDoc
            }, logs: {
                ...tempLog
            }
        };

        const blockCid = await this.updateRoot(currentRef, rootNode);

        return blockCid;
    }
}