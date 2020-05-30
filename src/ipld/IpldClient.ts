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
    private ipfsPath: string;
    constructor() {

    }

    public async initialize() {
        this.ipfsPath = '/tmp/ipfs' + Math.random()
        const ipfs = IPFS.create({
            pass: "01234567890123456789",
            repo: this.ipfsPath,
            config: {
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
    public async createNode(documentPayload: object, cid?: string) {
        if (cid) {
            return await this.ipfsClient.dag.put(documentPayload, { cid, pin: true })

        } else {
            return await this.ipfsClient.dag.put(documentPayload, { format: 'dag-cbor', hashAlg: 'sha2-256', pin: true })
        }
    }

}