var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const delay = require('delay');
function waitForPeers(ipfs, topic, peersToWait, waitForMs) {
    return __awaiter(this, void 0, void 0, function* () {
        const start = Date.now();
        while (true) {
            const peers = yield ipfs.pubsub.peers(topic);
            const everyPeerFound = peersToWait.every(p => peers.includes(p));
            if (everyPeerFound) {
                return;
            }
            if (Date.now() > start + waitForMs) {
                throw new Error(`Timed out waiting for peers to be subscribed to "${topic}"`);
            }
            yield delay(10);
        }
    });
}
exports.waitForPeers = waitForPeers;
//# sourceMappingURL=waitForPeers.js.map