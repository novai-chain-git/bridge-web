import { ethers } from 'ethers';
import { getNodeUrlByChain } from './getRpcUrl';

export const getRpcProviderByChain = (chainId: number) => {
  const rpc = getNodeUrlByChain(chainId);
  console.log(rpc,'rpc')
  return new ethers.providers.JsonRpcProvider(rpc);
};
