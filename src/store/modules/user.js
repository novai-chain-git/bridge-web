import { defineStore } from 'pinia';
import piniaPersistConfig from '@/config/piniaPersist';
import { cloneDeep } from 'lodash-es';
import router from '@/router/index.js';
import { ChainList } from '@/web3-sdk';
const BtcItem = ChainList.filter((item) => item.nativeCurrency.name === 'BTC');
export const useUserStore = defineStore({
  id: 'bridging-user',
  state: () => ({
    token: '',
    refreshToken: '',
    userInfo: {
      userName: '',
      roleCode: '',
      token: ''
    },
    assets: {
      point: 0,
      assetAmount: 0,
      pointRank: 0
    },
    // 存款默认币种
    depositCurrency: cloneDeep(BtcItem[0]),
    // 提现默认币种
    withdrawCurrency: cloneDeep(BtcItem[0])
  }),
  actions: {
    setUserState(...args) {
      this.$patch({ [args[0]]: args[1] });
    },
    setToken(token) {
      this.token = token.accessToken;
      this.refreshToken = token.refreshToken;
    },
    logout() {
      this.userInfo = {};
      this.token = '';
      this.refreshToken = '';
      this.assets = {
        point: 0,
        assetAmount: 0,
        pointRank: 0
      };
    }
  },
  persist: piniaPersistConfig('bridging-user')
});
