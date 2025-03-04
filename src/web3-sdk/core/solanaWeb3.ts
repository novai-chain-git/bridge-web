import { useSolanaWebState, useSolanaWebStateRefs } from '../stores/solanaWebState';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import {
  createTransferCheckedInstruction,
  getOrCreateAssociatedTokenAccount,
  getAccount
} from '@solana/spl-token';
import { toReadableAmount, fromReadableAmount } from '../utils/formatBalance';

// 是否已经监听事件
let isAddEvent = false;

/**
 * @solanaRpc solana rpc url
 * @usdtAddress USDT 代币地址
 *
 */
enum SolanaDirection {
  solanaRpc = 'https://go.getblock.io/4aff60e837a74419a611c0893d4121c3',
  usdtAddress = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
}

export const connection = new Connection(SolanaDirection.solanaRpc);

// 连接钱包
export const getSolanaWeb = async () => {
  const { setAccount } = useSolanaWebState();
  // 正常钱包链接
  /* const isSolana =
    window.solana && (window.solana.isPhantom || window.solana.isOKXWallet);
  if (isSolana) {
    try {
      const res = await window.solana.connect();
      const addressVal = res.publicKey.toString();
    } catch (error) {
      console.error(error);
    }
  } */

  // OK钱包链接
  const isSolana = window.okxwallet;

  if (isSolana) {
    try {
      const provider = window.okxwallet.solana;
      // await provider.disconnect();
      const res = await provider.connect();
      const addressVal = res.publicKey.toString();
      setAccount(addressVal);
    } catch (error) {
      console.error(error);
    }
  } else {
    window.open('https://www.okx.com/download');
  }
};

// 获取余额
export const getSolanaBalance = async () => {
  const { _account } = useSolanaWebStateRefs();
  if (!_account.value) return getSolanaWeb();
  const usdtAddress = new PublicKey(SolanaDirection.usdtAddress);
  const publicKey = new PublicKey(_account.value);
  try {
    const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
      mint: usdtAddress
    });
    const accountInfo = await getAccount(connection, tokenAccounts.value[0].pubkey);
    const balanceVal = toReadableAmount(accountInfo.amount, 6);
    return balanceVal;
  } catch (error) {
    console.error('获取余额失败', error);
  }
};

/**
 * 转账
 * @param toAddressVal // 接收方地址
 * @param amountVal  // 转账金额
 * @returns // 交易 ID
 */
export const handleSolanaTransFer = async (toAddressVal: string, amountVal: number) => {
  const { _account } = useSolanaWebStateRefs();
  if (!_account.value) return getSolanaWeb();
  // 我的地址
  const myAddress = new PublicKey(_account.value);
  // 到账地址
  const toAddress = new PublicKey(toAddressVal);
  // USDT 代币地址
  const usdtAddress = new PublicKey(SolanaDirection.usdtAddress);
  try {
    // 到账金额
    // const amount = BigInt(amountVal * 10 ** 6);
    const amount = fromReadableAmount(amountVal, 6);

    // 获取或创建发送方 Token Account
    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      myAddress,
      usdtAddress,
      myAddress
    );

    // 获取或创建接收方的 USDT Token Account
    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      myAddress, // 费用支付者
      usdtAddress,
      toAddress
    );

    // 创建转账指令
    const transferInstruction = createTransferCheckedInstruction(
      senderTokenAccount.address, // 发送方 Token Account
      usdtAddress, // USDT 的 Mint 地址
      recipientTokenAccount.address, // 接收方 Token Account
      myAddress, // 转账者
      amount, // 转账金额（按最小单位计算）
      6 // 小数点位数
    );

    const transaction = new Transaction().add(transferInstruction);
    transaction.feePayer = myAddress;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    // 使用钱包签名交易
    const signedTransaction = await window.solana.signTransaction(transaction);
    // 提交交易
    const txid = await connection.sendRawTransaction(signedTransaction.serialize());
    return txid;
  } catch (error) {
    console.error(error);
  }
};
