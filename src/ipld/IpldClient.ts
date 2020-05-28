import createIpid, { Ipid, getDid } from 'did-ipid';

export const generateRandomString = () =>
    Math.random()
        .toString(36)
        .substring(2);
const IPFS = require('ipfs');
const { DAGNode } = require('ipld-dag-pb');

const DEFAULT_CONTEXT = 'https://w3id.org/did/v1';

export class IpldClient {
    private ipfsClient;
    private ipid: Ipid;
    private ipfsPath: string;
    constructor(private universalResolver?: any, private lifetime = '87600h') {

    }


    public getIpidDidResolver() {
        return {
            ipid: this.resolveDID
        };
    }

    public setUniversalResolver(resolver) {
        this.universalResolver = resolver;
    }

    public async resolveDID(id: string) {

        try {
            //  console.log(this.ipfsClient)
            const {
                path
            } = await this.ipfsClient.name.resolve('/ipfs/' + id.split(`:`)[2]);
            console.log(path, id)
            const cidStr = path.replace(/^\/ipfs\//, '');
            const {
                value: content
            } = await this.ipfsClient.dag.get(cidStr);
            return content;
        } catch (err) {
            return false;
        }
    }

    public getDID(pem: string): Promise<any> {
        return getDid(pem);
    }

    public async createDID(pem: string): Promise<any> {
        const did = await getDid(pem);
        const has = await this.resolveDID(did)
        if (!has) {
            const doc = {
                '@context': DEFAULT_CONTEXT,
                id: did,
                created: new Date().toISOString()
            };

            return await this.publish(pem, doc);
        }
        return null;
    }

    private publish = async (pem, content) => {
        const keyName = this.generateKeyName();

        await this.importKey(keyName, pem);

        try {
            const cid = await this.ipfsClient.dag.put(content);
            const path = `/ipfs/${cid.toBaseEncodedString()}`;

            await this.ipfsClient.name.publish(path, {
                lifetime: this.lifetime,
                ttl: this.lifetime,
                key: keyName,
            });

            return content;
        } finally {
            await this.removeKey(keyName);
        }
    }

    private removeKey = async (keyName) => {
        const keysList = await this.ipfsClient.key.list();
        const hasKey = keysList.some(({ name }) => name === keyName);

        if (!hasKey) {
            return;
        }

        await this.ipfsClient.key.rm(keyName);
    }

    private importKey = async (keyName, pem, password?) => {
        await this.removeKey(keyName);

        await this.ipfsClient.key.import(keyName, pem, password);
    }


    private generateKeyName = () =>
        `js-ipid-${generateRandomString()}`;

    public async updateDID(pem: string, publicKeys: []) {
        const doc = await this.ipid.update.bind(this.ipid)(pem);
        publicKeys.forEach(i => {
            const pub = doc.addPublicKey(i);
            doc.addAuthentication(pub.id);
        });
    }

    public async initialize() {
        this.ipfsPath = '/tmp/ipfs' + Math.random()
        const ipfs = IPFS.create({
            pass: "01234567890123456789",
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
        this.ipid = createIpid(this.ipfsClient);
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