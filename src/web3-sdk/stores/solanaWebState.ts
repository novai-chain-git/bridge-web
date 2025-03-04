import piniaPersistConfig from '@/config/piniaPersist';
import { defineStore, storeToRefs } from 'pinia';
import { shortenAddress } from '../utils/contract';
import { getSolanaWeb } from '../core/solanaWeb3';

interface SolanaWebState {
  _account: string; // 钱包地址
}

export const useSolanaWebState = defineStore({
  id: 'SolanaWebState',
  state: (): SolanaWebState => ({
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
      return getSolanaWeb();
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
  persist: piniaPersistConfig('bridging-solanaWebState', null)
});

export const useSolanaWebStateRefs = () => storeToRefs(useSolanaWebState());
