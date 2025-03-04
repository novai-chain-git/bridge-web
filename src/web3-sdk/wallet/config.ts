import { ConnectorNames } from './types';
import type { Config } from './types';

export enum ChainId {
  BSC_MAINNET = 56, // 币安正式链
  BSC_TESTNET = 97, // 币安测试链
  // MATIC 链
  MATIC_MAINNET = 137,
  MATIC_TESTNET = 80002,
  //  Novai 链
  NOVAI_MAINNET = 7256,
  NOVAI_TESTNET = 7259,
  // BTC 链
  BTC_MAIN_NET = 0,
  BTC_TEST_NET = 1111,
  // 波场链
  TRON_MAIN_NET = 195,
  TRON_TEST_NET = 1951,
  // ETH 链
  ETH_MAINNET = 1,
  ETH_TESTNET = 11155111,
  // TON 链
  TON_MAIN_NET = 20101,
  TON_TEST_NET = 20201,
  // SOLANA 链
  SOLANA_MAIN_NET = 20102,
  SOLANA_TEST_NET = 20202
}
// USDT测试 精度
const DecimalsMap = {
  USDT: {
    [ChainId.NOVAI_TESTNET]: 6,
    [ChainId.ETH_TESTNET]: 6,
    [ChainId.MATIC_TESTNET]: 6,
    [ChainId.BSC_TESTNET]: 18
  },
  BTC: {
    [ChainId.NOVAI_TESTNET]: 8
  }
};

// USDT正式 精度
const DecimalsMapProduction = {
  USDT: {
    [ChainId.NOVAI_MAINNET]: 6,
    [ChainId.ETH_MAINNET]: 6,
    [ChainId.MATIC_MAINNET]: 6,
    [ChainId.BSC_MAINNET]: 18
  },
  BTC: {
    [ChainId.NOVAI_MAINNET]: 8
  }
};

export const ChainCoin = {
  [ChainId.BSC_TESTNET]: 'tBNB'
};

export const ChainIdList =
  import.meta.env.VITE_APP_NODE_ENV === 'development'
    ? // 测试
      [
        ChainId.MATIC_TESTNET,
        ChainId.NOVAI_TESTNET,
        ChainId.ETH_TESTNET,
        ChainId.BSC_TESTNET,
        ChainId.TRON_TEST_NET,
        ChainId.BTC_TEST_NET,
        ChainId.TON_TEST_NET
        //ChainId.SOLANA_TEST_NET
      ]
    : [
        // 正式
        ChainId.NOVAI_MAINNET,
        ChainId.ETH_MAINNET,
        ChainId.MATIC_MAINNET,
        ChainId.BSC_MAINNET,
        ChainId.TRON_MAIN_NET,
        ChainId.BTC_MAIN_NET,
        ChainId.TON_MAIN_NET
        //ChainId.SOLANA_MAIN_NET
      ];

export const connectorLocalStorageKey = 'connectorIdv2';
export const walletLocalStorageKey = 'wallet';
export const Decimals =
  import.meta.env.VITE_APP_NODE_ENV === 'development' ? DecimalsMap : DecimalsMapProduction;
