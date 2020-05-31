import { expect } from 'chai';
import { DIDDocumentBuilder } from '../did/DIDDocumentBuilder'
import { Wallet } from '../crypto';
import { IpldClient } from './../ipld';
import { DIDMethodXDV } from '../did';
import * as hash from 'hash.js';
let localStorage = {};

const alice = new IpldClient();
const bob = new IpldClient();

const xdvMethodShared = new DIDMethodXDV(alice);

describe("#xdvcomm", function () {

  beforeEach(function () {
  });
  it("should be able to send message to another recipient using IPFS pubsub", async function () {

    // init alice
    await alice.initialize();

    // init bob
    await bob.initialize();
    const topic1 = hash.sha256().digest('hex');
    const topic2 = hash.sha256().digest('hex');

    const peerAlice = await alice.ipfsClient.id();
    const peerBob = await bob.ipfsClient.id();

    const aAddr = peerAlice.addresses
      .find(ma => ma.nodeAddress().address === '127.0.0.1')
    const bAddr = peerBob.addresses
      .find(ma => ma.nodeAddress().address === '127.0.0.1')

    console.log('Alice: ' + peerAlice.id, 'Bob: ' + peerBob.id);
    const c1 = await alice.ipfsClient.swarm.connect(bAddr)
    const c2 = await bob.ipfsClient.swarm.connect(aAddr)

    // Peers exchange:
    // - topic
    // - peer address
    // - key exchange #1 (public keys for message encryption)
    // - key exchange #2 (public keys for data on rest in ipld)
    // - share as JWT/JWM {topic, peer address,  pub-message, pub-data-on-rest }
    await bob.ipfsClient.pubsub.subscribe(topic1, (msg) => {
      if (msg.from !== peerBob.id) {
        console.log(`Message from ${msg.from} to Bob: ${msg.data.toString()}`)
        expect(msg.from).equals(peerAlice.id);
      }
    }, { discover: true });
    await alice.ipfsClient.pubsub.subscribe(topic1, (msg) => {
      if (msg.from !== peerAlice.id) {
        console.log(`Message from ${msg.from} to Alice: ${msg.data.toString()}`);
        expect(msg.from).equals(peerBob.id);
      }
    }, { discover: true });

    // }, 2000);
    const { waitForPeers } = require('./waitForPeers');
    await waitForPeers(alice.ipfsClient, topic1, [peerBob.id], 30000);
    await waitForPeers(bob.ipfsClient, topic1, [peerAlice.id], 30000);

    // // Exchange message
    await alice.ipfsClient.pubsub.publish(topic1, `Send me some ether`)

    await bob.ipfsClient.pubsub.publish(topic1, `Sending 1 ether`)

    // // // unsubcribe and close connection
    // await bob.ipfsClient.pubsub.unsubscribe(topic1);
    // await alice.ipfsClient.pubsub.unsubscribe(topic1);
    // await alice.ipfsClient.swarm.disconnect(bAddr)
    // await bob.ipfsClient.swarm.disconnect(aAddr)

  });


});
