"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const did_ipid_1 = __importStar(require("did-ipid"));
exports.generateRandomString = () => Math.random()
    .toString(36)
    .substring(2);
const IPFS = require('ipfs');
const { DAGNode } = require('ipld-dag-pb');
const DEFAULT_CONTEXT = 'https://w3id.org/did/v1';
class IpldClient {
    constructor(universalResolver, lifetime = '87600h') {
        this.universalResolver = universalResolver;
        this.lifetime = lifetime;
        this.publish = (pem, content) => __awaiter(this, void 0, void 0, function* () {
            const keyName = this.generateKeyName();
            yield this.importKey(keyName, pem);
            try {
                const cid = yield this.ipfsClient.dag.put(content);
                const path = `/ipfs/${cid.toBaseEncodedString()}`;
                yield this.ipfsClient.name.publish(path, {
                    lifetime: this.lifetime,
                    ttl: this.lifetime,
                    key: keyName,
                });
                return content;
            }
            finally {
                yield this.removeKey(keyName);
            }
        });
        this.removeKey = (keyName) => __awaiter(this, void 0, void 0, function* () {
            const keysList = yield this.ipfsClient.key.list();
            const hasKey = keysList.some(({ name }) => name === keyName);
            if (!hasKey) {
                return;
            }
            yield this.ipfsClient.key.rm(keyName);
        });
        this.importKey = (keyName, pem, password) => __awaiter(this, void 0, void 0, function* () {
            yield this.removeKey(keyName);
            yield this.ipfsClient.key.import(keyName, pem, password);
        });
        this.generateKeyName = () => `js-ipid-${exports.generateRandomString()}`;
    }
    getIpidDidResolver() {
        return {
            ipid: this.resolveDID
        };
    }
    setUniversalResolver(resolver) {
        this.universalResolver = resolver;
    }
    resolveDID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //  console.log(this.ipfsClient)
                const { path } = yield this.ipfsClient.name.resolve('/ipfs/' + id.split(`:`)[2]);
                console.log(path, id);
                const cidStr = path.replace(/^\/ipfs\//, '');
                const { value: content } = yield this.ipfsClient.dag.get(cidStr);
                return content;
            }
            catch (err) {
                return false;
            }
        });
    }
    getDID(pem) {
        return did_ipid_1.getDid(pem);
    }
    createDID(pem) {
        return __awaiter(this, void 0, void 0, function* () {
            const did = yield did_ipid_1.getDid(pem);
            const has = yield this.resolveDID(did);
            if (!has) {
                const doc = {
                    '@context': DEFAULT_CONTEXT,
                    id: did,
                    created: new Date().toISOString()
                };
                return yield this.publish(pem, doc);
            }
            return null;
        });
    }
    updateDID(pem, publicKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.ipid.update.bind(this.ipid)(pem);
            publicKeys.forEach(i => {
                const pub = doc.addPublicKey(i);
                doc.addAuthentication(pub.id);
            });
        });
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
            this.ipid = did_ipid_1.default(this.ipfsClient);
        });
    }
    /**
     * Returns a node filter by cid and path
     * @param cid Content Id
     * @param path  Path
     */
    getNode(cid, path) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ipfsClient.dag.get(cid, path);
        });
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
    createNode(documentPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ipfsClient.dag.put(documentPayload, { format: 'dag-cbor', hashAlg: 'sha2-256' });
        });
    }
}
exports.IpldClient = IpldClient;
//# sourceMappingURL=IpldClient.js.map