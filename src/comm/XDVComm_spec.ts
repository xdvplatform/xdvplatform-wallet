import { expect } from 'chai';
import { DIDDocumentBuilder } from '../did/DIDDocumentBuilder'
import { Wallet } from '../crypto';
import { IpldClient } from './../ipld';
import { DIDMethodXDV } from '../did';
import * as hash from 'hash.js';
let localStorage = {};

import { Pubsub } from './Pubsub';

const alice = new Pubsub();
const bob = new Pubsub();

const xdvMethodShared = new DIDMethodXDV(alice);

describe("#xdvcomm", function () {

  beforeEach(function () {
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
