import piniaPersistConfig from '@/config/piniaPersist';
import { defineStore, storeToRefs } from 'pinia';

const networkVal = import.meta.env.VITE_APP_NODE_ENV === 'development' ? 'testnet' : 'livenet';
console.log('networkVal',networkVal);

interface BtcWebState {
  btcAccount: string; // 钱包地址
  network: string; // 网络
  balance: number; // 余额
}

export const useBtcWebState = defineStore({
  id: 'btcWebState',
  state: (): BtcWebState => ({
    btcAccount: '',
    network: networkVal,
    balance: 0
  }),

  getters: {
   getNetwork(): string {
    return this.network;
   },
   getBtcAccount(): string {
     return this.btcAccount;
   },
   getBalance(): number {
    return this.balance;
   }
  },
  actions: {
    setBtcAccount(account: string) {
      this.btcAccount = account;
    },
    setBtcBalance(balance: number) {
      this.balance = balance;
    },
  },
  persist: piniaPersistConfig('bridging-btcWebState', null)
  /* persist: {
    paths: ['connectorName', 'priceNumberHds']
  } */
});

export const useBtcWebStateRefs = () => storeToRefs(useBtcWebState());
