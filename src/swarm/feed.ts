import { BzzBrowser } from '@erebos/bzz-browser';
import { BzzFeed, FeedID } from '@erebos/bzz-feed';
import { createKeyPair, sign } from '@erebos/secp256k1';
import { forkJoin } from 'rxjs';
import { getFeedTopic } from '@erebos/bzz-feed/esm/feed';
import { pubKeyToAddress } from '@erebos/keccak256';
// @ts-ignore

const PromiseFileReader = require("promise-file-reader");

// const BZZ_URL = 'https://dappnode.auth2factor.com/swarm/';
const BZZ_URL = "https://swarm-gateways.net/";

export class SwarmFeed {
    bzz: BzzBrowser;
    bzzFeed: BzzFeed;
    constructor(private signer: any, public user: string,
        private url: string = BZZ_URL) { }


    initialize() {
        const bzz = new BzzBrowser({ url: this.url });
        const bzzFeed = new BzzFeed({ bzz, signBytes: this.signer })

        this.bzz = bzz;
        this.bzzFeed = bzzFeed;
    }
    async   publishDirectory({ name, defaultPath, contents, options = {} }: {
        name: string;
        contents: any[];
        defaultPath: string;
        options?: any;
    }) {

        const feedHash = await this.bzzFeed.createManifest({
            user: this.user, name
        });

        // upload as directory
        let directory = {};
        let displayFeedDirectory = {};
        contents.forEach(i => {
            const item = {
                // @ts-ignore
                [i.filename || i.name]: {
                    data: i,
                    contentType: i.type,
                    size: i.size,
                }
            }
            // console.log(item)
            directory = {
                ...item,
                ...directory,
            };
        });

        const hash = await this.bzz.uploadDirectory(directory, {
            encrypt: true,
            defaultPath,
            ...options
        });


        contents.forEach(i => {
            const uiItem = {
                // @ts-ignore
                [i.filename || i.name]: {
                    // @ts-ignore
                    name: i.filename || i.name,
                    contentType: i.type,
                    size: i.size,
                    // @ts-ignore
                    url: `bzz:/${feedHash}/${i.filename || i.name}`
                }
            }

            displayFeedDirectory = {
                ...uiItem,
                ...displayFeedDirectory,
            }
        })

        const feedH = await this.bzzFeed.setContentHash(feedHash, hash);

        return { displayFeedDirectory, feed: feedH, feedHash, user: this.user, hostingName: name, contentUrl: `${BZZ_URL}bzz:/${feedHash}` };
    }

    getContents({ hash }: { hash: string, }) {

        return this.bzzFeed.getContent(hash);

    }

    toSwarmPayload(o: object) {
        return Object.keys(o).map(i => {
           // @ts-ignore
            return new File([Buffer.from(JSON.stringify(o[i]))], i, {
                type: 'application/json',
            });
        });
    }

}