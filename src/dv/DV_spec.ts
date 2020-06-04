import { DV, CedulaInputTypes } from './index';
import { expect } from 'chai';

describe("#dv", function () {

    beforeEach(function () {
    });
    it("when an id sent, should return a correct DV number", async function () {
        const nodeUrl = 'https://eth-mainnet.zerion.io/';
        const isMainnet = true;
        const account = '0x73f7eda56ace0c949f19a7e28eb14b9194cdf405';

        const dv = new DV(account, nodeUrl, isMainnet);


        await dv.initialize();
        const resp = await dv.calculate(CedulaInputTypes.N,
            [0, 8],
            [0, 0],
            [7, 1, 3],
            [2, 2, 3]);

        expect(resp).equals('11');

    });


});
