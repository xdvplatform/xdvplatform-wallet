import { ethers } from 'ethers';
import { setupSolido } from './setupSolido';
const BN = require('bn.js');

let ruc20 = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
];

export const CedulaInputTypes= {
    N: [5],
    NT: [4, 3],
    E: [5],
    P: [7],
    I: [9],
    AV: [1, 5],
};


export class DV {

    private contract: any;
    constructor(private account: string, private nodeUrl: string, private isMainnet?: boolean) {
    }

    public async initialize() {
        const network = this.isMainnet ? 'mainnet' : 'ropsten';
        const contracts = await setupSolido(new ethers.providers.JsonRpcProvider(this.nodeUrl),
            this.account, network);

        this.contract = contracts.DV;
    }

    async calculate(cedulaType: number[], segment1: number[], segment2: number[], segment3: number[], segment4: number[]) {

        const id = [
            ...cedulaType,
            ...segment1,
            ...segment2,
            ...segment3, // 4
            ...segment4, // 6
        ];

        let ruc21 = [...ruc20.slice(0, 20 - id.length), ...id, 0];

        const resp = await this.contract.methods.calc(ruc21);
        const dvRepuesta = resp.map(i => i.toString()).join('');
        return dvRepuesta;
    }
}