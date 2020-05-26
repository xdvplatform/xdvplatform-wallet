const IPFS = require('ipfs');
const { DAGNode } = require('ipld-dag-pb');

export class IpldClient {
    private ipfsClient;
    private ipfsPath: string;
    constructor() {

    }

    public async initialize() {
        this.ipfsPath = '/tmp/ipfs' + Math.random()
        const ipfs = IPFS.create({
            repo: this.ipfsPath,
            config: {
                Addresses: {
                    Swarm: [
                        '/ip4/0.0.0.0/tcp/0'
                    ],
                    API: '/ip4/127.0.0.1/tcp/0',
                    G1ateway: '/ip4/127.0.0.1/tcp/0'
                },
                "AutoNAT": {},
                "Bootstrap": [
                    "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
                    "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
                    "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
                    "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
                    "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ"
                ],
            }
        })

        this.ipfsClient = await ipfs;
    }

    /**
     * Returns a node filter by cid and path
     * @param cid Content Id
     * @param path  Path
     */
    public async getNode(cid: string, path: string) {
        return await this.ipfsClient.dag.get(cid, path)
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
    public async createNode(documentPayload: object) {

        return await this.ipfsClient.dag.put(documentPayload, { format: 'dag-cbor', hashAlg: 'sha2-256' })

    }

}