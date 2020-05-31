'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Libp2p = require('libp2p');
const WS = require('libp2p-websockets');
const Multiplex = require('libp2p-mplex');
const SECIO = require('libp2p-secio');
const GossipSub = require('libp2p-gossipsub');
const PeerInfo = require('peer-info');
const RELAY_MULTIADDR = '/ip4/127.0.0.1/tcp/24642/ws';
const config = () => __awaiter(void 0, void 0, void 0, function* () {
    return {
        peerInfo: yield PeerInfo.create(),
        dialer: {
            maxParallelDials: 150,
            maxDialsPerPeer: 4,
            dialTimeout: 10e3 // 10 second dial timeout per peer dial
        },
        modules: {
            transport: [
                WS
            ],
            streamMuxer: [
                Multiplex
            ],
            connEncryption: [
                SECIO
            ],
            pubsub: GossipSub
        },
        config: {
            peerDiscovery: {
                autoDial: false,
                bootstrap: {
                    enabled: false
                }
            },
            pubsub: {
                enabled: true,
                emitSelf: true
            }
        }
    };
});
module.exports = (otherNode) => __awaiter(void 0, void 0, void 0, function* () {
    const node = new Libp2p(yield config());
    yield node.start();
    // connect to relay peer
    yield node.dial(RELAY_MULTIADDR);
    // both nodes created, get them to dial each other via the relay
    if (otherNode) {
        const relayId = node.connections.keys().next().value;
        const otherNodeId = otherNode.peerInfo.id.toB58String();
        const nodeId = node.peerInfo.id.toB58String();
        yield node.dial(`${RELAY_MULTIADDR}/p2p/${relayId}/p2p-circuit/p2p/${otherNodeId}`);
        yield otherNode.dial(`${RELAY_MULTIADDR}/p2p/${relayId}/p2p-circuit/p2p/${nodeId}`);
    }
    return node;
});
module.exports.config = config;
//# sourceMappingURL=libp2p.config.js.map