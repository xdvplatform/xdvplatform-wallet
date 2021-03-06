module.exports = {
    VERSION: '1.0.0',
    DV: {
      raw: {
        abi: [
          {
            inputs: [],
            stateMutability: 'nonpayable',
            type: 'constructor',
            signature: 'constructor',
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: 'uint256[]',
                name: 'dv',
                type: 'uint256[]',
              },
            ],
            name: 'LogDV',
            type: 'event',
            signature:
              '0x8fa5265e3481bd5db266f079a635b8a7b934ad77c4bfc232519c492d3015be9b',
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: 'address',
                name: 'payee',
                type: 'address',
              },
              {
                indexed: false,
                internalType: 'uint256',
                name: 'weiAmount',
                type: 'uint256',
              },
            ],
            name: 'Withdrawn',
            type: 'event',
            signature:
              '0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5',
          },
          {
            inputs: [
              { internalType: 'address payable', name: 'payee', type: 'address' },
            ],
            name: 'withdraw',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
            signature: '0x51cff8d9',
          },
          {
            inputs: [{ internalType: 'uint256', name: '_fee', type: 'uint256' }],
            name: 'setFee',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
            signature: '0x69fe0e2d',
          },
          {
            inputs: [],
            name: 'getFee',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'nonpayable',
            type: 'function',
            signature: '0xced72f87',
          },
          {
            inputs: [
              { internalType: 'uint256', name: 'pos', type: 'uint256' },
              { internalType: 'uint256[]', name: 'ruc21', type: 'uint256[]' },
            ],
            name: 'getCharsAt',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
            constant: true,
            signature: '0xfe1e6fa7',
          },
          {
            inputs: [],
            name: 'seed',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function',
            signature: '0x7d94792a',
          },
          {
            inputs: [
              { internalType: 'uint256[]', name: 'ruc21', type: 'uint256[]' },
            ],
            name: 'calc',
            outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
            stateMutability: 'view',
            type: 'function',
            constant: true,
            signature: '0xb4dbca29',
          },
        ],
      },
      address: {
        development: '0x916Fe9EFC9c4E91fBE6c6189d18b35A6727ed2aa',
        'ropsten-fork': '0xB312276722ACceb92598a34664B9E8f28d8B27BF',
        'mainnet': '0x73f7eDA56AcE0C949f19A7E28EB14b9194Cdf405',
      },
    },
  };
  