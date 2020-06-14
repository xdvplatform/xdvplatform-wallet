import * as hash from 'hash.js';
import { DIDDocumentBuilder } from '../did/DIDDocumentBuilder';
import { DIDMethodXDV } from '../did';
import { expect } from 'chai';
import { IpldClient } from './../ipld';
import { Pubsub } from './Pubsub';
import { Wallet } from '../crypto';
let localStorage = {};


let alice;
let bob;
let xdvMethodShared;
let ipld;

describe("#xdvcomm", function () {

  beforeEach(function () {
    ipld = new IpldClient();
     alice = new Pubsub(ipld);
     bob = new Pubsub(ipld);
    xdvMethodShared = new DIDMethodXDV(alice);

  });
  it("should be able to send message to another recipient using IPFS pubsub", async function () {

    // init alice
    await alice.initialize();

    // init bob
    await bob.initialize();

    const a = await alice.connectPeer(bob.currentAddress);
    const b = await bob.connectPeer(alice.currentAddress);

    // Peers exchange:
    // - topic
    // - peer address
    // - key exchange #1 (public keys for message encryption)
    // - key exchange #2 (public keys for data on rest in ipld)
    // - share as JWT/JWM {topic, peer address,  pub-message, pub-data-on-rest }



    // }, 2000);
    const topic = Pubsub.createTopic();
    const topicSubscriptionAlice = await alice.subscribeToTopic(topic);
    const topicSubscriptionBob = await bob.subscribeToTopic(topic);



    // unsubscribe from topic
    topicSubscriptionAlice.handler.subscribe(async message => {
      console.log(`Message from ${message.from} to Bob: ${message.data.toString()}`)
      expect(message.from).equals(alice.currentPeerId);

      await topicSubscriptionAlice.unsubscribe();

    });

    topicSubscriptionBob.handler.subscribe(async message => {
      console.log(`Message from ${message.from} to Alice: ${message.data.toString()}`);
      expect(message.from).equals(bob.currentPeerId);

      await topicSubscriptionBob.unsubscribe();

    });

    await topicSubscriptionAlice.waitForPeers();
    await topicSubscriptionBob.waitForPeers();


    await topicSubscriptionAlice.send('Send me some ether');
    await topicSubscriptionBob.send('Sending 1 ether');

  });


});
