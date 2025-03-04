import { useTronWebState, useTronWebStateRefs } from '../stores/tronWebState';
import { ElNotification } from 'element-plus';
import i18n from '@/lang';
import { getERC20Contract } from '../utils/contractHelpers';
import { getAddress } from '../utils/addressHelpers';
import { getRpcProviderByChain } from '../utils/providers';
import TokenWebView from '@consenlabs-fe/webview';
import { ChainId, useActiveWebState } from '@/web3-sdk';
import tp from 'tp-js-sdk';
import { useUserStore } from '@/store/modules/user';

// 是否已经监听事件
let isAddEvent = false;
/**
 * 在DApp加载完成后，TronLink 会在其中注入 window.tronLink 对象
 * 如果用户连接过此 DApp， 则可以直接获取tronLink.tronWeb
 * 如果未连接过，则可以调用请求连接后获取
 */

export const getTronWeb = async () => {
  const { setAccount } = useTronWebState();
  const { setChainId } = useActiveWebState();
  let tronWeb;
  const isImToken = TokenWebView.isTokenEnv();

  // 是否是tp钱包
  const isTp = tp.isConnected();
  console.log('isTp11111', window, isTp, window.tronLink, window.tronWeb);
  if (window?.tronLink?.ready) {
    tronWeb = window.tronLink.tronWeb;
    tronWeb && setAccount(tronWeb.defaultAddress.base58);
    console.log('tronWeb.defaultAddress.base58', tronWeb.defaultAddress.base58);
  } else if (window.tron) {
    try {
      await window.tron.request({ method: 'eth_requestAccounts' });
      window.tronWeb && setAccount(window.tronWeb.defaultAddress.base58);
    } catch (error) {
      if (error.code === -32000) {
        ElNotification({
          type: 'error',
          message: i18n.global.t('requests are too frequent, please try again later')
        });
      }
    }
  } else if (isTp && (!window.tronWeb || !window.tron)) {
    const wallet = await tp.getWallet({ walletTypes: ['tron'] });
    setAccount(wallet.data.address);
    setChainId(ChainId.TRON_MAIN_NET);
    window.location.reload();
  } else if (isImToken && !window.tronWeb) {
    // 是否是imToken钱包
    await TokenWebView.apis.user.showAccountSwitch('TRON');
    window.location.reload();
  } else if (window?.tronLink && window.tronWeb) {
    const res = await window.tronLink.request({ method: 'tron_requestAccounts' });
    if (res === '') {
      setAccount('');
      return ElNotification({
        type: 'warning',
        title: i18n.global.t('TronLink Not Logged In'),
        message: i18n.global.t('Please log in to TronLink first')
      });
    }
    if (res?.code === 200) {
      tronWeb = window.tronLink.tronWeb;
    }
  } else if (window.tronWeb) {
    tronWeb = window.tronWeb;
    window.tronWeb && setAccount(window.tronWeb.defaultAddress.base58);
  }
  return tronWeb;
};

export const initTronConnect = () => {
  const userStore = useUserStore();
  const symbolVal = userStore.depositCurrency.nativeCurrency.symbol;
  if (symbolVal !== 'TRX') return;

  if (isAddEvent) return;
  const { setAccount, killConnect } = useTronWebState();
  window.addEventListener('message', async (e) => {
    if (!e.data.message) return;
    console.log('tron message event', e.data);
    try {
      switch (e.data.message.action) {
        case 'accountsChanged':
        case 'connect':
          try {
            await getTronWeb();
            window.tronWeb && setAccount(window.tronWeb.defaultAddress.base58);
          } catch (error) {}
          break;
        case 'disconnect':
          // killConnect();
          break;
        case 'setNode':
          // 0x2b6653dc 波场主网TronGrid的chainId
          if (e.data.message !== '0x2b6653dc') {
            return ElNotification({
              type: 'info',
              title: i18n.global.t('It is not currently linked to the Wavefield mainnet')
            });
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('tron error：', error);
    }
  });
  isAddEvent = true;
};
