import { ChainId, ChainIdList } from './config';
import { BASE_CHAIN_ID } from '@/web3-sdk';
import novaiIcon from '@/assets/img/home/novai.png';
import ethIcon from '@/assets/img/home/eth.png';
import maticIcon from '@/assets/img/home/matic.png';
import bnbIcon from '@/assets/img/home/bnb.png';
import tronIcon from '@/assets/img/home/tron.png';
import btcIcon from '@/assets/img/home/btc.png';
import bnb from '@/assets/img/token/bnb.png';
import eth from '@/assets/img/token/eth.png';
import nusd from '@/assets/img/token/nusd.png';
import usdc from '@/assets/img/token/usdc.png';
import usdt from '@/assets/img/token/usdt.png';
import wbtc from '@/assets/img/token/wbtc.png';
import tron from '@/assets/img/token/tron.png';
import hubnb from '@/assets/img/token/hubnb.png';
import hubtc from '@/assets/img/token/hubtc.png';
import hueth from '@/assets/img/token/hueth.png';
import hutron from '@/assets/img/token/hutron.png';
import huusdc from '@/assets/img/token/huusdc.png';
import huwbtc from '@/assets/img/token/huwbtc.png';
import nusdt from '@/assets/img/token/nusdt.png';
import ton from '@/assets/img/token/ton.png';
import solana from '@/assets/img/home/solana.svg';

export const EmptyAddress = {
  [ChainId.MATIC_TESTNET]: '',
  [ChainId.MATIC_MAINNET]: ''
};

// 区块链浏览器地址配置
export const MAIN_BSC_SCAN_URLS = {
  [ChainId.NOVAI_MAINNET]: 'https://scan.novaichain.com/novaichain',
  [ChainId.ETH_MAINNET]: 'https://etherscan.io/',
  [ChainId.MATIC_MAINNET]: 'https://polygonscan.com/',
  [ChainId.BSC_MAINNET]: 'https://bscscan.com/'
};
export const TEST_BSC_SCAN_URLS = {
  [ChainId.NOVAI_TESTNET]: 'https://scan.novaichain.com/novaichain',
  [ChainId.ETH_TESTNET]: 'https://sepolia.etherscan.io/',
  [ChainId.MATIC_TESTNET]: 'https://amoy.polygonscan.com/',
  [ChainId.BSC_TESTNET]: 'https://testnet.bscscan.com/'
};
export const BASE_BSC_SCAN_URLS = {
  ...MAIN_BSC_SCAN_URLS,
  ...TEST_BSC_SCAN_URLS
};

// BTC链
export const BTC_CHAIN = {
  [ChainId.BTC_TEST_NET]: {
    chainId: ChainId.BTC_TEST_NET,
    chainOriginalId: ChainId.BTC_TEST_NET,
    chainName: 'BTC',
    nativeCurrency: {
      name: 'BTC',
      symbol: 'BTC',
      decimals: 18
    },
    rpcUrls: [],
    blockExplorerUrls: [],
    icon: btcIcon
  },
  [ChainId.BTC_MAIN_NET]: {
    chainId: ChainId.BTC_MAIN_NET,
    chainOriginalId: ChainId.BTC_MAIN_NET,
    chainName: 'BTC',
    nativeCurrency: {
      name: 'BTC',
      symbol: 'BTC',
      decimals: 18
    },
    rpcUrls: [],
    blockExplorerUrls: [],
    icon: btcIcon
  }
};

// 波场链
export const TRON_CHAIN = {
  [ChainId.TRON_TEST_NET]: {
    chainId: ChainId.TRON_TEST_NET,
    chainOriginalId: ChainId.TRON_TEST_NET,
    chainName: 'Tron',
    nativeCurrency: {
      name: 'TRX',
      symbol: 'TRX',
      decimals: 18
    },
    rpcUrls: [],
    blockExplorerUrls: [],
    icon: tron
  },
  [ChainId.TRON_MAIN_NET]: {
    chainId: ChainId.TRON_MAIN_NET,
    chainOriginalId: ChainId.TRON_MAIN_NET,
    chainName: 'Tron',
    nativeCurrency: {
      name: 'TRX',
      symbol: 'TRX',
      decimals: 18
    },
    rpcUrls: [],
    blockExplorerUrls: [],
    icon: tron
  }
};

// ETH 链主网
export const ETHEREUM_CHAIN_MAINNET = {
  [ChainId.NOVAI_MAINNET]: {
    chainId: `0x${ChainId.NOVAI_MAINNET.toString(16)}`,
    chainOriginalId: ChainId.NOVAI_MAINNET,
    chainName: 'Novai',
    nativeCurrency: {
      name: 'NOVAI',
      symbol: 'NOVAI',
      decimals: 18
    },
    rpcUrls: ['https://rpc.novaichain.com'],
    blockExplorerUrls: [BASE_BSC_SCAN_URLS[ChainId.NOVAI_MAINNET]],
    icon: novaiIcon
  },
  [ChainId.ETH_MAINNET]: {
    chainId: `0x${ChainId.ETH_MAINNET.toString(16)}`,
    chainOriginalId: ChainId.ETH_MAINNET,
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://rpc.mevblocker.io', 'https://eth.drpc.org'],
    blockExplorerUrls: [BASE_BSC_SCAN_URLS[ChainId.ETH_MAINNET]],
    icon: eth
  },
  [ChainId.MATIC_MAINNET]: {
    chainId: `0x${ChainId.MATIC_MAINNET.toString(16)}`,
    chainOriginalId: ChainId.MATIC_MAINNET,
    chainName: 'Polygon',
    nativeCurrency: {
      name: 'POL',
      symbol: 'POL',
      decimals: 18
    },
    rpcUrls: ['https://polygon-bor-rpc.publicnode.com', 'https://polygon-pokt.nodies.app','https://polygon.meowrpc.com'],
    blockExplorerUrls: [BASE_BSC_SCAN_URLS[ChainId.MATIC_MAINNET]],
    icon: maticIcon
  },
  [ChainId.BSC_MAINNET]: {
    chainId: `0x${ChainId.BSC_MAINNET.toString(16)}`,
    chainOriginalId: ChainId.BSC_MAINNET,
    chainName: 'BNB',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://go.getblock.io/1b31103faef44cb4b4caedfba04ac046'],
    blockExplorerUrls: [BASE_BSC_SCAN_URLS[ChainId.BSC_MAINNET]],
    icon: bnb
  }
};

// ETH 测试网
export const ETHEREUM_CHAIN_TESTNET = {
  [ChainId.NOVAI_TESTNET]: {
    chainId: `0x${ChainId.NOVAI_TESTNET.toString(16)}`,
    chainOriginalId: ChainId.NOVAI_TESTNET,
    chainName: 'Novai',
    nativeCurrency: {
      name: 'NOVAI',
      symbol: 'NOVAI',
      decimals: 18
    },
    rpcUrls: ['http://192.168.101.44:8545'],
    blockExplorerUrls: [BASE_BSC_SCAN_URLS[ChainId.NOVAI_TESTNET]],
    icon: novaiIcon
  },
  [ChainId.ETH_TESTNET]: {
    chainId: `0x${ChainId.ETH_TESTNET.toString(16)}`,
    chainOriginalId: ChainId.ETH_TESTNET,
    chainName: 'Eth',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://endpoints.omniatech.io/v1/eth/sepolia/public', 'https://1rpc.io/sepolia'],
    blockExplorerUrls: [BASE_BSC_SCAN_URLS[ChainId.ETH_TESTNET]],
    icon: eth
  },
  [ChainId.MATIC_TESTNET]: {
    chainId: `0x${ChainId.MATIC_TESTNET.toString(16)}`,
    chainOriginalId: ChainId.MATIC_TESTNET,
    chainName: 'Polygon',
    nativeCurrency: {
      name: 'POL',
      symbol: 'POL',
      decimals: 18
    },
    rpcUrls: [
      'https://polygon-amoy.blockpi.network/v1/rpc/public',
      'https://polygon-amoy-bor-rpc.publicnode.com'
    ],
    blockExplorerUrls: [BASE_BSC_SCAN_URLS[ChainId.MATIC_TESTNET]],
    icon: maticIcon
  },
  [ChainId.BSC_TESTNET]: {
    chainId: `0x${ChainId.BSC_TESTNET.toString(16)}`,
    chainOriginalId: ChainId.BSC_TESTNET,
    chainName: 'BNB',
    nativeCurrency: {
      name: 'TBNB',
      symbol: 'tBNB',
      decimals: 18
    },
    rpcUrls: ['https://go.getblock.io/1b31103faef44cb4b4caedfba04ac046'],
    blockExplorerUrls: [BASE_BSC_SCAN_URLS[ChainId.BSC_TESTNET]],
    icon: bnb
  }
};

// TON 链
export const TON_CHAIN = {
  [ChainId.TON_TEST_NET]: {
    chainId: ChainId.TON_TEST_NET,
    chainOriginalId: ChainId.TON_TEST_NET,
    chainName: 'TON',
    nativeCurrency: {
      name: 'TON',
      symbol: 'TON',
      decimals: 18
    },
    rpcUrls: ['https://toncenter.com/api/v2/jsonRPC'],
    blockExplorerUrls: [],
    icon: ton
  },
  [ChainId.TON_MAIN_NET]: {
    chainId: ChainId.TON_MAIN_NET,
    chainOriginalId: ChainId.TON_MAIN_NET,
    chainName: 'TON',
    nativeCurrency: {
      name: 'TON',
      symbol: 'TON',
      decimals: 18
    },
    rpcUrls: ['https://toncenter.com/api/v2/jsonRPC'],
    blockExplorerUrls: [],
    icon: ton
  }
};
// SOLANA 链
export const SOLANA_CHAIN = {
  [ChainId.SOLANA_TEST_NET]: {
    chainId: ChainId.SOLANA_TEST_NET,
    chainOriginalId: ChainId.SOLANA_TEST_NET,
    chainName: 'SOLANA',
    nativeCurrency: {
      name: 'SOLANA',
      symbol: 'SOLANA',
      decimals: 18
    },
    rpcUrls: [],
    blockExplorerUrls: [],
    icon: solana
  },
  [ChainId.SOLANA_MAIN_NET]: {
    chainId: ChainId.SOLANA_MAIN_NET,
    chainOriginalId: ChainId.SOLANA_MAIN_NET,
    chainName: 'SOLANA',
    nativeCurrency: {
      name: 'SOLANA',
      symbol: 'SOLANA',
      decimals: 18
    },
    rpcUrls: [],
    blockExplorerUrls: [],
    icon: solana
  }
};

export const ETHEREUM_CHAIN = {
  ...ETHEREUM_CHAIN_MAINNET,
  ...ETHEREUM_CHAIN_TESTNET,
  ...BTC_CHAIN,
  ...TRON_CHAIN,
  ...TON_CHAIN,
  ...SOLANA_CHAIN
};

// 代币信息
// 测试链
const TokenInfoTestnet = {
  [ChainId.NOVAI_TESTNET]: [
    {
      img: nusdt,
      symbol: 'USDT',
      name: 'nUSDT'
    },
    {
      img: btcIcon,
      symbol: 'BTC',
      name: 'nBTC'
    },
    {
      img: hueth,
      symbol: 'ETH',
      name: 'ETH'
    },
    {
      img: huusdc,
      symbol: 'USDC',
      name: 'USDC'
    }
  ],
  [ChainId.ETH_TESTNET]: [
    {
      img: usdt,
      symbol: 'USDT',
      name: 'USDT'
    },
    {
      img: hueth,
      symbol: 'ETH',
      name: 'ETH'
    },
    {
      img: huusdc,
      symbol: 'USDC',
      name: 'USDC'
    },
    {
      img: huwbtc,
      symbol: 'WBTC',
      name: 'WBTC'
    }
  ],
  [ChainId.MATIC_TESTNET]: [
    {
      img: usdt,
      symbol: 'USDT',
      name: 'USDT'
    },
    {
      img: huusdc,
      symbol: 'USDC',
      name: 'USDC'
    }
  ],
  [ChainId.BSC_TESTNET]: [
    {
      img: usdt,
      symbol: 'USDT',
      name: 'USDT'
    },
    {
      img: hubnb,
      symbol: 'BNB',
      name: 'BNB'
    },
    {
      img: huusdc,
      symbol: 'USDC',
      name: 'USDC'
    }
  ],
  [ChainId.TRON_TEST_NET]: [
    {
      img: usdt,
      symbol: 'USDT',
      name: 'USDT'
    }
  ],
  [ChainId.BTC_TEST_NET]: [
    {
      img: btcIcon,
      symbol: 'BTC',
      name: 'BTC'
    }
  ],
  [ChainId.TON_TEST_NET]: [
    {
      img: usdt,
      symbol: 'USDT',
      name: 'USDT'
    }
  ],
  [ChainId.SOLANA_TEST_NET]: [
    {
      img: usdt,
      symbol: 'USDT',
      name: 'USDT'
    }
  ]
};

// 正式链
const TokenInfoMainnet = {
  [ChainId.NOVAI_MAINNET]: [
    {
      img: nusdt,
      symbol: 'USDT',
      name: 'nUSDT'
    },
    {
      img: btcIcon,
      symbol: 'BTC',
      name: 'nBTC'
    },
    {
      img: hueth,
      symbol: 'ETH',
      name: 'ETH'
    },
    {
      img: huusdc,
      symbol: 'USDC',
      name: 'USDC'
    }
  ],
  [ChainId.ETH_MAINNET]: [
    {
      img: usdt,
      symbol: 'USDT',
      name: 'USDT'
    },
    {
      img: hueth,
      symbol: 'ETH',
      name: 'ETH'
    },

    {
      img: huusdc,
      symbol: 'USDC',
      name: 'USDC'
    },
    {
      img: huwbtc,
      symbol: 'WBTC',
      name: 'WBTC'
    }
  ],
  [ChainId.MATIC_MAINNET]: [
    {
      img: usdt,
      symbol: 'USDT',
      name: 'USDT'
    },
    {
      img: huusdc,
      symbol: 'USDC',
      name: 'USDC'
    }
  ],
  [ChainId.BSC_MAINNET]: [
    {
      img: usdt,
      symbol: 'USDT',
      name: 'USDT'
    },
    {
      img: hubnb,
      symbol: 'BNB',
      name: 'BNB'
    },
    {
      img: huusdc,
      symbol: 'USDC',
      name: 'USDC'
    }
  ],
  [ChainId.TRON_MAIN_NET]: [
    {
      img: usdt,
      symbol: 'USDT',
      name: 'USDT'
    }
  ],
  [ChainId.BTC_MAIN_NET]: [
    {
      img: btcIcon,
      symbol: 'BTC',
      name: 'BTC'
    }
  ],
  [ChainId.TON_MAIN_NET]: [
    {
      img: usdt,
      symbol: 'USDT',
      name: 'USDT'
    }
  ],
  [ChainId.SOLANA_MAIN_NET]: [
    {
      img: usdt,
      symbol: 'USDT',
      name: 'USDT'
    }
  ]
};

// TP钱包切换网络所需要的钱包名称
export const WalletTypes = {
  [ChainId.NOVAI_MAINNET]: 'eth',
  [ChainId.ETH_MAINNET]: 'eth',
  [ChainId.MATIC_MAINNET]: 'polygon',
  [ChainId.BSC_MAINNET]: 'bsc',
  [ChainId.TRON_MAIN_NET]: 'tron',
  [ChainId.NOVAI_TESTNET]: 'eth',
  [ChainId.ETH_TESTNET]: 'eth',
  [ChainId.MATIC_TESTNET]: 'polygon',
  [ChainId.BSC_TESTNET]: 'bsc',
  [ChainId.TRON_TEST_NET]: 'tron'
};

export const TokenInfo = {
  ...TokenInfoTestnet,
  ...TokenInfoMainnet
};

export type EthereumChain = keyof typeof ETHEREUM_CHAIN;

export const ChainList = ChainIdList.map((item) => ETHEREUM_CHAIN[item]).filter(
  (item) => item.chainOriginalId !== BASE_CHAIN_ID
);
console.log(ChainList,'ChainList')
