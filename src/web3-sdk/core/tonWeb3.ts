import { useTonWebState, useTonWebStateRefs } from '../stores/tonWebState';
import i18n from '@/lang';
import { TonClient, toNano, Address, JettonMaster, JettonWallet, beginCell } from '@ton/ton';
import TonConnect, { toUserFriendlyAddress } from '@tonconnect/sdk';

// 是否已经监听事件
let isAddEvent = false;

//console.log(window.location.host,window.location.protocol'window.location.host')
/**
 * @apiKey api key
 * @tonRpc ton rpc
 * @tonManifest ton manifest
 * @jettoUsdt 合约地址
 *  */
enum TonDirection {
  apiKey = '7927681ed50192c3e06eba96c86966bf84deb865bc1638e3196e462531a1fa17',
  tonRpc = 'https://toncenter.com/api/v2/jsonRPC',
  tonManifest = 'https://bridge.novaichain.com/manifest.json',
  jettoUsdt = 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs'
}
// tonmanifest 地址

export const getTonConnect = new TonConnect({
  manifestUrl: TonDirection.tonManifest
});

export const client = new TonClient({
  endpoint: TonDirection.tonRpc,
  apiKey: TonDirection.apiKey
});

//获取钱包列表列表
export const getWalletsList = async () => {
  return await getTonConnect.getWallets();
};
//获取可使用的钱包
export const getWallets = async () => {
  try {
    const walletsList = await getWalletsList();
    return walletsList.find((item: any) => item.injected);
  } catch (e) {
    console.log(e);
  }
};

//格式化数据
const getTonAddress = (address: string) => {
  return Address.parse(address);
};
// retryWithExponentialBackoff
const getRetryWithExponentialBackoff = async (address) => {
  return await retryWithExponentialBackoff(address);
};
/**
 * 在DApp加载完成后，okxwallet 会在其中注入 window.okxwallet 对象
 * 如果用户连接过此 DApp， 则可以直接获取okxwallet
 * 如果未连接过，则可以调用请求连接后获取
 */

export const getTonWeb = async () => {
  const { setAccount } = useTonWebState();
  // console.log('getTonConnect',await TonConnect.getWallets());
  // getTonConnect.restoreConnection();
  const embeddedWallet: any = await getWallets();
  getTonConnect.connect({ jsBridgeKey: embeddedWallet.jsBridgeKey });
  let address = null;
  //监听ton
  const unsubscribe = getTonConnect.onStatusChange(async (walletInfo) => {
    const originalAddress = walletInfo.account.address;
    address = toUserFriendlyAddress(originalAddress);
    setAccount(address);
    // getTonUsdtBalance(address);
  });
};
const formatAmount = (unformattedAmount: bigint | unknown, decimals: number) => {
  return Number(BigInt(unformattedAmount?.toString() || 0)) / Math.pow(10, decimals);
};

// 获取余额
export async function getTonUsdtBalance(address: string) {
  // 转为jettoUsdt 地址
  const walletAddress = getTonAddress(address);
  const jettonMasterAddress = getTonAddress(TonDirection.jettoUsdt);
  const jettonMaster = client.open(JettonMaster.create(jettonMasterAddress));
  const getJettonAddress = async () => await jettonMaster.getWalletAddress(walletAddress);
  const jettonAddress = await getRetryWithExponentialBackoff(getJettonAddress);
  const jettonWallet = JettonWallet.create(jettonAddress);
  const getBalance = async () => {
    return await jettonWallet.getBalance(client.provider(jettonAddress));
  };
  const jettonBalance = await getRetryWithExponentialBackoff(getBalance);
  // console.log('jettonBalance', jettonBalance);
  const balance = formatAmount(jettonBalance, 6);
  // console.log('balance', balance);
  console.log(balance, 'balance');
  return balance;
}

//ton转账
export async function tonSend(receiptAddress, amount) {
  const { account } = useTonWebState();
  if (!account) return;
  if (!getTonConnect.connected) {
    await getTonConnect.restoreConnection();
  }
  try {
    console.log(account, 'account');
    // 接收地址
    const destinationAddress = getTonAddress(receiptAddress);
    // 合约地址
    const jettonMasterAddress = getTonAddress(TonDirection.jettoUsdt);
    // 我的地址
    const userAddress = getTonAddress(account);

    const jettonMaster = client.open(JettonMaster.create(jettonMasterAddress));
    const jettonAddress = await jettonMaster.getWalletAddress(userAddress);

    console.log('jettonAddress', jettonAddress.toString());

    const parsedCallData = amount * 1000000;

    const forwardPayload = beginCell()
      .storeUint(0, 32) // 0 opcode means we have a comment
      .storeStringTail(parsedCallData.toString())
      .endCell();

    const body = beginCell()
      .storeUint(0x0f8a7ea5, 32) // opcode for jetton transfer
      .storeUint(0, 64) // query id
      .storeCoins(parsedCallData) // jetton amount
      .storeAddress(destinationAddress) // TON wallet destination address
      .storeAddress(destinationAddress) // response excess destination
      .storeBit(0) // no custom payload
      .storeCoins(toNano('0.000001')) // forward amount (if >0, will send notification message)
      .storeBit(1) // we store forwardPayload as a reference
      .storeRef(forwardPayload)
      .endCell();

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [
        {
          address: jettonAddress.toString(),
          amount: toNano('0.045').toString(),
          payload: body.toBoc().toString('base64')
        }
      ]
    };
    const res = await getTonConnect.sendTransaction(transaction);
    console.log('res', res);

    return res;
  } catch (error) {
    console.log('error', error);
  }
}

export default async function retryWithExponentialBackoff(fn, maxAttempts = 3, baseDelayMs = 1000) {
  let attempt = 1;

  const execute = async () => {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= maxAttempts) {
        throw error;
      }

      const delayMs = baseDelayMs * 2 ** attempt;
      await new Promise((resolve) => setTimeout(resolve, delayMs));

      attempt++;
      return await execute();
    }
  };

  return await execute();
}
