import piniaPersistConfig from '@/config/piniaPersist';
import { defineStore, storeToRefs } from 'pinia';
import { shortenAddress } from '../utils/contract';
import { getTronWeb } from '../core/tronWeb3';

interface TronWebState {
  _account: string; // 钱包地址
}

export const useTronWebState = defineStore({
  id: 'tronWebState',
  state: (): TronWebState => ({
    _account: '',
  
  }),
  getters: {
    account(): string {
      return this._account;
    },
    accountLower(): string {
      return this.account?.toLowerCase();
    },
    shortAccount(): string {
      return shortenAddress(this.account);
    },
    library() {
      return getTronWeb();
    },
   
  },
  actions: {
    setAccount(account: string) {
      if (this._account === account) return;
      this._account = account;
    },
    killConnect() {
      this._account = '';
    },
   
  },
  persist: piniaPersistConfig('bridging-tronWebState', null)
});

export const useTronWebStateRefs = () => storeToRefs(useTronWebState());
