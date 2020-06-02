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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pubsub = void 0;
const ipld_1 = require("../ipld");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const hash = __importStar(require("hash.js"));
const delay = require('delay');
const { waitForPeers } = require('./waitForPeers');
class Pubsub {
    constructor(ipld = new ipld_1.IpldClient()) {
        this.ipld = ipld;
        this.peers = [];
    }
    static createTopic() {
        return hash.sha256().digest('hex');
    }
    subscribeToTopic(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ipld.ipfsClient.pubsub.subscribe(topic, (msg) => {
                if (msg.from !== this.currentPeerId) {
                    // console.log(`Message from ${msg.from} to Bob: ${msg.data.toString()}`)
                    // expect(msg.from).equals(peerAlice.id);
                    this.subject.next(Object.assign({}, msg));
                }
            }, { discover: true });
            const { peers } = this;
            const topicSubscription = {
                waitForPeers: () => __awaiter(this, void 0, void 0, function* () {
                    console.log(peers, topic);
                    const start = Date.now();
                    while (true) {
                        const peers = yield this.ipld.ipfsClient.pubsub.peers(topic);
                        const everyPeerFound = peers.every(p => peers.includes(p));
                        if (everyPeerFound) {
                            return;
                        }
                        if (Date.now() > start + 30000) {
                            throw new Error(`Timed out waiting for peers to be subscribed to "${topic}"`);
                        }
                        yield delay(10);
                    }
                }),
                handler: this.subject.pipe(operators_1.filter(i => i.topic === topic)),
                send: (message) => this.send(topic, message),
                unsubscribe: () => this.ipld.ipfsClient.pubsub.unsubscribe(topic),
            };
            return topicSubscription;
        });
    }
    /**
     * Publish a message to topic
     * @param topic
     * @param message
     */
    send(topic, message) {
        return this.ipld.ipfsClient.pubsub.publish(topic, message);
    }
    /**
     * Connects to a peer
     * @param peerAddress Peer to connect to
     */
    connectPeer(peerId) {
        this.peers.push(peerId);
        return this.ipld.ipfsClient.swarm.connect(peerId);
    }
    disconnectPeer(peerId) {
        return this.ipld.ipfsClient.swarm.disconnect(peerId);
    }
    /**
     * Initializes pubsub
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.subject = new rxjs_1.Subject();
            yield this.ipld.initialize();
            const peer = yield this.ipld.ipfsClient.id();
            this.address = peer.addresses
                .find(ma => ma.nodeAddress().address === '127.0.0.1');
            this.peerId = peer.id;
        });
    }
    /**
     * Gets the current address
     */
    get currentAddress() {
        return this.address;
    }
    get currentPeerId() {
        return this.peerId;
    }
}
exports.Pubsub = Pubsub;
//# sourceMappingURL=Pubsub.js.map