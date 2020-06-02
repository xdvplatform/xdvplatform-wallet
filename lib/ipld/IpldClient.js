"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpldClient = exports.generateRandomString = exports.LoggableNode = void 0;
const storage_1 = require("../storage");
class LoggableNode {
}
exports.LoggableNode = LoggableNode;
exports.generateRandomString = () => Math.random()
    .toString(36)
    .substring(2);
const IPFS = require('ipfs');
const { DAGNode } = require('ipld-dag-pb');
const Graph = require('ipld-graph-builder');
const DEFAULT_CONTEXT = 'https://w3id.org/did/v1';
class IpldClient {
    constructor() {
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.ipfsPath = '/tmp/ipfs' + Math.random();
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
            });
            this.ipfsClient = yield ipfs;
            this.graph = new Graph(this.ipfsClient.dag);
        });
    }
    /**
     * Returns a node filter by cid and path
     * @param cid Content Id
     * @param path  Path
     */
    flush(node) {
        return this.graph.flush(node);
    }
    set(a, b) {
        return this.graph.set(a, b);
    }
    /**
     * Returns a node filter by cid and path
     * @param cid Content Id
     * @param path  Path
     */
    getNode(cid, path) {
        return this.ipfsClient.dag.get(cid, path);
    }
    /**
     * List trees in a cid and returns an array of paths
     * @param cid Content Id
     */
    listTree(cid) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            let paths = [];
            try {
                for (var _b = __asyncValues(this.ipfsClient.dag.tree(cid, { recursive: true })), _c; _c = yield _b.next(), !_c.done;) {
                    const path = _c.value;
                    paths = [...paths, path];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return paths;
        });
    }
    /**
     * Creates a node in ipld
     * @param documentPayload An object payload
     */
    createNode(documentPayload, cid) {
        if (cid) {
            return this.ipfsClient.dag.put(documentPayload, { cid, pin: true });
        }
        else {
            return this.ipfsClient.dag.put(documentPayload, { format: 'dag-cbor', hashAlg: 'sha2-256', pin: true });
        }
    }
    createDidNode(did, tag) {
        return __awaiter(this, void 0, void 0, function* () {
            // initial tree
            const didNode = storage_1.DIDNodeSchema.create(did, 'rsa_key_for_documens');
            const cid = yield this.createNode(didNode);
            // create log
            const log = storage_1.LogNodeSchema.create(cid, storage_1.EventType.add, `DID node created for ${did.id}`);
            const logCid = yield this.createNode(log);
            return {
                cid: cid.toString(),
                cidLog: logCid.toString(),
            };
        });
    }
    appendDocumentNode(didCid, document, tag) {
        return __awaiter(this, void 0, void 0, function* () {
            // create document
            const docCid = storage_1.DocumentNodeSchema.create(didCid, Object.assign({}, document), tag);
            const cid = yield this.createNode(docCid);
            // create log
            const log = storage_1.LogNodeSchema.create(cid, storage_1.EventType.add, `Document node appended`);
            const logCid = yield this.createNode(log);
            return {
                cid: cid.toString(),
                cidLog: logCid.toString(),
            };
        });
    }
    setSigner(signerFun) {
        this.signer = signerFun;
    }
    updateRoot(lastCid, rootPatch) {
        return __awaiter(this, void 0, void 0, function* () {
            let root = {};
            if (lastCid === null) {
                root = {
                    did: Object.assign({}, rootPatch.did),
                    document: Object.assign({}, rootPatch.document), logs: Object.assign({}, rootPatch.logs),
                    $block: 0,
                    $ref: undefined,
                };
            }
            else {
                const { value } = yield this.getNode(lastCid, '/');
                const b = value.$block + 1;
                root = {
                    did: Object.assign(Object.assign({}, value.did), rootPatch.did),
                    document: Object.assign(Object.assign({}, value.document), rootPatch.document), logs: Object.assign(Object.assign({}, value.logs), rootPatch.logs),
                    $block: b,
                    $ref: lastCid,
                };
            }
            const signature = yield this.signer(JSON.stringify(root));
            root.$signature = signature;
            return yield this.createNode(root);
        });
    }
    patchBlock(currentRef, did = [], document = [], log = []) {
        return __awaiter(this, void 0, void 0, function* () {
            let block = new storage_1.BlockSchema();
            if (currentRef !== null) {
                block = yield this.getNode(currentRef, '/');
            }
            if (this.signer === null) {
                throw new Error('Missing signer');
            }
            // DID
            let tempDid = Object.assign({}, block.did);
            did.forEach(({ cid, tag }) => {
                tempDid = Object.assign(Object.assign({}, tempDid), { [tag]: cid });
            });
            // Document
            let tempDoc = Object.assign({}, block.document);
            document.forEach(({ cid, tag }) => {
                tempDoc = Object.assign(Object.assign({}, tempDoc), { [tag]: cid });
            });
            // Log
            let tempLog = Object.assign({}, block.logs);
            log.forEach(({ cids, timestamp }) => {
                tempLog = Object.assign(Object.assign({}, tempLog), { [timestamp]: [...cids] });
            });
            const rootNode = {
                did: Object.assign({}, tempDid),
                document: Object.assign({}, tempDoc), logs: Object.assign({}, tempLog)
            };
            const blockCid = yield this.updateRoot(currentRef, rootNode);
            return blockCid;
        });
    }
}
exports.IpldClient = IpldClient;
//# sourceMappingURL=IpldClient.js.map