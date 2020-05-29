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
exports.IpldClient = exports.generateRandomString = void 0;
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
        return __awaiter(this, void 0, void 0, function* () {
            if (cid) {
                return yield this.ipfsClient.dag.put(documentPayload, { cid, pin: true });
            }
            else {
                return yield this.ipfsClient.dag.put(documentPayload, { format: 'dag-cbor', hashAlg: 'sha2-256', pin: true });
            }
        });
    }
}
exports.IpldClient = IpldClient;
//# sourceMappingURL=IpldClient.js.map