import { SolidoModule, ContractImport } from "@decent-bet/solido";
import { EthersPlugin, DispatcherArgs } from "solido-provider-ethers";
import  { ethers } from 'ethers';
const DVAbi = require('./DV.abi');

const DVContractImport : ContractImport  = DVAbi.DV;
export type Networks =  'ropsten' | 'mainnet';
export const setupSolido = async (  ethersProvider, defaultAccount, network = 'ropsten' ) => {
    // const networks: any = {
    //   3: 'ropsten',
    //   1: 'mainnet',
    //   4: 'rinkeby',
    // }
    // Create Solido Module
    const contractMappings = [
      {
        name: "DV",
        import: DVContractImport,
        provider: EthersPlugin,
        enableDynamicStubs: true
      },
    ];
  
    // Create Solido Module
    const solido = new SolidoModule(contractMappings);
    const provider = ethersProvider;
  

    // Configure reactive solido store
    const store = {
      state: {
      },
      mutations: {
      },
      mapEvents: {
      },
      mapActions: {
      }
    };
    const contracts = solido
      .bindContracts({
        ethers: {
          provider,
          options: {
            defaultAccount,
            provider,
            network,
            store
          }
        }
      })
      .connect();

      return contracts;
  };
  