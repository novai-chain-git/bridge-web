import { ethers } from 'ethers';
import addresses from '../constants/contracts';

// Addresses
import { getAddress } from './addressHelpers';

// ABI
import { erc20Abi, LaunchBridgeAbi,ChainConnect,ETHUSDT } from '../abi/index';

import { getContract } from './contract';

export const getERC20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(address, erc20Abi, signer);
};


export const getChainConnectContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(address, ChainConnect, signer);
};
