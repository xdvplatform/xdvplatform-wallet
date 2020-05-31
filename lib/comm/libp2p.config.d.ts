declare const Libp2p: any;
declare const WS: any;
declare const Multiplex: any;
declare const SECIO: any;
declare const GossipSub: any;
declare const PeerInfo: any;
declare const RELAY_MULTIADDR = "/ip4/127.0.0.1/tcp/24642/ws";
declare const config: () => Promise<{
    peerInfo: any;
    dialer: {
        maxParallelDials: number;
        maxDialsPerPeer: number;
        dialTimeout: number;
    };
    modules: {
        transport: any[];
        streamMuxer: any[];
        connEncryption: any[];
        pubsub: any;
    };
    config: {
        peerDiscovery: {
            autoDial: boolean;
            bootstrap: {
                enabled: boolean;
            };
        };
        pubsub: {
            enabled: boolean;
            emitSelf: boolean;
        };
    };
}>;
