import { IpldClient } from '../ipld';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as hash from 'hash.js';
const delay = require('delay')


export class Pubsub {
    private subject: Subject<any>;
    private address: any;
    private peers: any[] = [];
    private peerId: string;
    constructor(private ipld: IpldClient = new IpldClient()) { }

    public static createTopic() {
        return hash.sha256().digest('hex');
    }

    public async subscribeToTopic(topic: string) {
        await this.ipld.ipfsClient.pubsub.subscribe(topic, (msg) => {
            if (msg.from !== this.currentPeerId) {
                // console.log(`Message from ${msg.from} to Bob: ${msg.data.toString()}`)
                // expect(msg.from).equals(peerAlice.id);
                this.subject.next({ ...msg });
            }
        }, { discover: true });

        const { peers } = this;
        const topicSubscription = {
            waitForPeers: async () => {
                console.log(peers, topic)
                const start = Date.now()

                while (true) {
                    const peers = await this.ipld.ipfsClient.pubsub.peers(topic)
                    const everyPeerFound = peers.every(p => peers.includes(p))

                    if (everyPeerFound) {
                        return
                    }

                    if (Date.now() > start + 30000) {
                        throw new Error(`Timed out waiting for peers to be subscribed to "${topic}"`)
                    }

                    await delay(10)
                }

            },
            handler: this.subject.pipe(
                filter(i => i.topic === topic)
            ),
            send: (message: string) => this.send(topic, message),
            unsubscribe: () => this.ipld.ipfsClient.pubsub.unsubscribe(topic),
        };

        return topicSubscription;
    }

    /**
     * Publish a message to topic
     * @param topic 
     * @param message 
     */
    public send(topic: string, message: string) {
        return this.ipld.ipfsClient.pubsub.publish(topic, message);
    }
    /**
     * Connects to a peer
     * @param peerAddress Peer to connect to 
     */
    public connectPeer(peerId: any) {
        this.peers.push(peerId);
        return this.ipld.ipfsClient.swarm.connect(peerId);
    }

    public disconnectPeer(peerId: any) {
        return this.ipld.ipfsClient.swarm.disconnect(peerId);
    }


    /**
     * Initializes pubsub
     */
    public async initialize() {
        this.subject = new Subject();
        await this.ipld.initialize();
        const peer = await this.ipld.ipfsClient.id();
        this.address = peer.addresses
            .find(ma => ma.nodeAddress().address === '127.0.0.1')
        this.peerId = peer.id;
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