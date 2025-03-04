import piniaPersistConfig from '@/config/piniaPersist';
import { defineStore, storeToRefs } from 'pinia';
import { shortenAddress } from '../utils/contract';
import { getTonWeb } from '../core/tonWeb3';

interface TonWebState {
  _account: string; // 钱包地址
}

export const useTonWebState = defineStore({
  id: 'tonWebState',
  state: (): TonWebState => ({
    _account: ''
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
      return getTonWeb();
    }
  },
  actions: {
    setAccount(account: string) {
      //if (this._account === account) return;
      console.log('setAccount', account);
      this._account = account;
    },
    killConnect() {
      this._account = '';
    }
  },
  persist: piniaPersistConfig('bridging-tonWebState', null)
});

export const useTonWebStateRefs = () => storeToRefs(useTonWebState());
