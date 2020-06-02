import { IpldClient } from '../ipld';
export declare class Pubsub {
    private ipld;
    private subject;
    private address;
    private peers;
    private peerId;
    constructor(ipld?: IpldClient);
    static createTopic(): string;
    subscribeToTopic(topic: string): Promise<{
        waitForPeers: () => Promise<void>;
        handler: import("rxjs").Observable<any>;
        send: (message: string) => any;
        unsubscribe: () => any;
    }>;
    /**
     * Publish a message to topic
     * @param topic
     * @param message
     */
    send(topic: string, message: string): any;
    /**
     * Connects to a peer
     * @param peerAddress Peer to connect to
     */
    connectPeer(peerId: any): any;
    disconnectPeer(peerId: any): any;
    /**
     * Initializes pubsub
     */
    initialize(): Promise<void>;
    /**
     * Gets the current address
     */
    get currentAddress(): any;
    get currentPeerId(): string;
}
