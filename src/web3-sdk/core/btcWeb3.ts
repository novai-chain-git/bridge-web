import { ElNotification } from 'element-plus';
import { watch, ref } from 'vue';
import { useBtcWebStateRefs, useBtcWebState, totalAmout } from '@/web3-sdk';
import { useUserStore } from '@/store/modules/user.js';
import TokenWebView from '@consenlabs-fe/webview';
import tp from 'tp-js-sdk';
import i18n from '@/lang';

// 链接unisat钱包
export const connectBtc = async (key: string) => {
  const { getNetwork, getBtcAccount } = useBtcWebStateRefs();
  const { setBtcAccount } = useBtcWebState();
  const { getBtcBalanceFunc } = getBtcBalanceWatch(key);
  const isImToken = TokenWebView.isTokenEnv();

  if (isImToken) {
    const address = await TokenWebView.apis.user.showAccountSwitch('BITCOIN');
    console.log('ImToken钱包', address);
    window.location.reload();
    console.log('windowBTC', window);
  }
  const isTp = tp.isConnected();
  console.log('getBtcAccount', !getBtcAccount.value);

  if ((isTp && !window.unisat) || (isTp && !getBtcAccount.value)) {
    const wallet = await tp.getWallet({ walletTypes: ['btc'] });
    const address = wallet.data.address;
    setBtcAccount(address);
    window.location.reload();
    return false;
  }
  if (typeof window.unisat === 'undefined') {
    ElNotification({
      type: 'warning',
      title: i18n.global.t('UniSat Wallet not installed'),
      message: i18n.global.t(
        'Please click here to visit the product page. After installing the extension, please refresh the page'
      ),
      onClick: () => {
        window.open('https://unisat.io/download', '_blank');
      }
    });
    return;
  }
  try {
    // 切换网络
    await unisat.switchNetwork(getNetwork.value);

    const [address] = await unisat.requestAccounts();
    setBtcAccount(address);
    getBtcBalanceFunc();
  } catch (error) {
    console.error('error：', error);
  }
};

// 获取钱包可用余额
export const getBtcBalanceWatch = (key: string) => {
  const { getBtcAccount } = useBtcWebStateRefs();
  const userStore = useUserStore();
  const btcBalanceLoading = ref(false);
  const getBtcBalanceFunc = async () => {
    const { getBtcAccount } = useBtcWebStateRefs();
    const { setBtcBalance } = useBtcWebState();
    if (!getBtcAccount.value) return;
    if (btcBalanceLoading.value) return;
    try {
      btcBalanceLoading.value = true;
      const { total } = await unisat.getBalance();
      const res = await unisat.getInscriptions(0, 1000);
      const num = res.list.reduce((prev, cur) => cur.outputValue + prev, 0);
      const balance = total - num;
      const availableBalance = totalAmout(balance);

      setBtcBalance(availableBalance);
    } catch (error) {
      console.log('获取余额出错：', error);
    } finally {
      btcBalanceLoading.value = false;
    }
  };
  watch(
    [getBtcAccount, () => userStore[key].nativeCurrency.symbol],
    ([account, currency]) => {
      if (account && currency === 'BTC') {
        getBtcBalanceFunc();
      }
    },
    {
      immediate: true
    }
  );
  return {
    btcBalanceLoading,
    getBtcBalanceFunc
  };
};

export const accountsChanged = () => {
  const { setBtcAccount } = useBtcWebState();
  unisat.on('accountsChanged', (accounts: Array<string>) => {
    setBtcAccount(accounts[0]);
  });
};
