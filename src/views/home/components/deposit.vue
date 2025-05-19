<template>
  <div class="deposit w100% pt10 pb16 <md:py15" text="14 c9 ">
    <!-- <el-divider>
      <span class="font-500 text-14 text-[#B1B1B1]">{{ $t('from') }}</span>
    </el-divider> -->
    <div class="bg-bg12 bdr8 px16 py10 mb10">
      <div class="cursor-pointer h50 fyc <md:(h45 bdr10)" @click="switchChain">
        <img class="w26 h26 <md:(w19 h19)" :src="userStore.depositCurrency.icon" alt="" />
        <span class="text-14 ml-10">{{ userStore.depositCurrency.chainName }}</span>
        <img src="@/assets/img/home/arrow.svg" alt="" class="mlauto w14 <md:(w7)" />
      </div>
      <div class="mt10 <md:(text-13)" text="14 c14" v-if="isShowAddress">
        <span>{{ $t('Wallet Address') }}：</span>
        <span>{{ showAddress }}</span>
      </div>
    </div>
    <div class="relative">
      <div class="down_arrow w64 h42 bg-[#0F1111] bdr21 fcc" position="absolute left-50%">
        <div class="w48 h26 bg-to5 fcc bdr23">
          <img src="@/assets/img/home/arrive.svg" class="w13 <md:(w14)" alt="" />
        </div>
      </div>
    </div>

    <el-form ref="ruleFormRef" :model="state" :rules="rules" label-width="0">
      <!-- <el-divider>
        <span class="font-500 text-14 text-[#B1B1B1]">{{ $t('to') }}</span>
      </el-divider> -->
      <div class="bg-bg12 border-rd-t-8 p16 pb20 mb10">
        <div class="fyc <md:( mt10 )">
          <img class="w30 h30 <md:(w19 h19)" src="@/assets/img/home/novai.png" alt="" />
          <span class="text-14 ml-10">{{ ETHEREUM_CHAIN[BASE_CHAIN_ID].chainName }}</span>
        </div>

        <el-form-item ref="numberInputRef" class="value-wrap error_tips h-40" prop="address">
          <el-input
            class="border-none h100%"
            :placeholder="$t('Enter wallet address')"
            clearable
            v-model="state.address"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
      </div>
      <div class="mt10 bg-bg12 border-rd-b-8 p16">
        <div class="fyb h34 <md:()">
          <el-form-item ref="numberInputRef" class="flex-1 value-num error_tips_two" prop="number">
            <el-input
              class="border-none"
              @input="changeNum"
              :placeholder="$t('Deposit quantity')"
              v-model="state.number"
              type="number"
              autocomplete="off"
            />
          </el-form-item>
          <div class="fyc cursor-pointer h34 bdr17 p1" border="1 solid line1">
            <el-dropdown trigger="click" placement="bottom-end" @command="changeSymbol">
              <span class="fyc">
                <img :src="acSymbol.img" alt="" class="w30 h30 <md:(w19 h19)" />
                <span class="mx8 <md:(mx10 text-13)" text="16 c9">{{ acSymbol.symbol }}</span>
                <img src="@/assets/img/home/arrow.svg" alt="" class="w14 mr8 <md:(w7)" />
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(item, i) in symbols"
                    :key="i"
                    :command="item"
                    :class="{
                      'no_usdt_curr ':
                        item.symbol === 'ETH' ||
                        item.symbol === 'USDC' ||
                        item.symbol === 'WBTC' ||
                        item.symbol === 'BNB'
                    }"
                  >
                    <img :src="item.img" alt="" class="w26 h26 <md:(w19 h19)" />
                    <span class="ml15 <md:(text-13)" text="16 c13">{{ item.symbol }}</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="mt-10 font-500 text-14 text-c9 flex items-center justify-end">
          <div class="fyc mr8">
            <el-icon v-if="isBtc && btcBalanceLoading" class="is-loading" color="#5AC27C">
              <Loading />
            </el-icon>
            <el-icon
              v-if="!isBtc && !isTron && tokenBalanceLoading"
              class="is-loading"
              color="#5AC27C"
            >
              <Loading />
            </el-icon>
            <el-icon v-if="isTron && tronBalanceLoading" class="is-loading" color="#5AC27C">
              <Loading />
            </el-icon>
            <span class="text-14 text-c14 <md:text-14"> {{ $t('Balance') }}: </span>
            <img class="w22 h22 mx8 <md:(w19 h19)" :src="balanceLogo" />
            <span class="text-14 text-c14 <md:text-14">{{ balance }}</span>
          </div>
          <el-button
            @click="setMaxValue"
            link
            type="primary"
            class="text-c10! text-16 font-bold! <md:(text-13)"
            >MAX</el-button
          >
        </div>
      </div>

      <p
        sm="text-16 mt-20 <md:pt-10"
        class="text-12 mt-10 text-c14 text-center <md:(mt20 text-14)"
        flex="~ justify-between"
      >
        <span>{{ $t('You will receive') }}：</span>
        <span class="receive_num text-c12 font-700"
          >{{ state.number || 0 }}
          {{
            $t('earnings', {
              eth: state.symbol
            })
          }}</span
        >
      </p>
      <!-- 确认按钮 
      <el-form-item class="mt-10" v-if="isBtc">
        <el-button
          v-if="!getBtcAccount"
          :loading="state.loading"
          :disabled="state.loading"
          class="w100% h64! bdr-14 bg-[#4D51D2] border-none py-22 text-18 <md:(h49! bdr10 text-14)"
          type="primary"
          @click="() => connectBtc('depositCurrency')"
          >{{
            $t('connect to', {
              chainName: userStore.depositCurrency.chainName.replace(
                /Mainnet|Testnet/,
                $t('and confirm')
              )
            })
          }}
        </el-button>
        <el-button
          v-else
          :loading="state.loading"
          :disabled="state.loading"
          class="w100% h64! bdr-14 bg-[#4D51D2] border-none py-22 text-18 <md:(h49! bdr10 text-14)"
          type="primary"
          @click="btcSubmitForm(ruleFormRef)"
          >{{ $t('confirm') }}
        </el-button>
      </el-form-item>
      <el-form-item class="mt-10" v-else-if="isTron">
        <el-button
          v-if="!tronWebState.account.value"
          :loading="state.loading"
          :disabled="state.loading"
          class="w100% h64! bdr-14 bg-[#4D51D2] border-none py-22 text-18 <md:(h49! bdr10 text-14)"
          type="primary"
          @click="getTronWeb"
          >{{
            $t('connect to', {
              chainName: userStore.depositCurrency.chainName.replace(
                /Mainnet|Testnet/,
                $t('and confirm')
              )
            })
          }}
        </el-button>
        <el-button
          v-else
          :loading="state.loading"
          :disabled="state.loading"
          class="w100% h64! bdr-14 bg-[#4D51D2] border-none py-22 text-18 <md:(h49! bdr10 text-14)"
          type="primary"
          @click="tronSubmit(ruleFormRef)"
          >{{ $t('confirm') }}
        </el-button>
      </el-form-item>
      <el-form-item class="mt-10" v-else-if="isTon">
        <el-button
          v-if="!tonWebState.account.value"
          :loading="state.loading"
          :disabled="state.loading"
          class="w100% h64! bdr-14 bg-[#4D51D2] border-none py-22 text-18 <md:(h49! bdr10 text-14)"
          type="primary"
          @click="getTonWeb"
          >{{
            $t('connect to', {
              chainName: userStore.depositCurrency.chainName.replace(
                /Mainnet|Testnet/,
                $t('and confirm')
              )
            })
          }}
        </el-button>
        <el-button
          v-else
          :loading="state.loading"
          :disabled="state.loading"
          class="w100% h64! bdr-14 bg-[#4D51D2] border-none py-22 text-18 <md:(h49! bdr10 text-14)"
          type="primary"
          @click="tronSubmit(ruleFormRef)"
          >{{ $t('confirm') }}
        </el-button>
      </el-form-item>
      <el-form-item class="mt-10" v-else-if="isSolana">
        <el-button
          v-if="!solanaWebState.account.value"
          :loading="state.loading"
          :disabled="state.loading"
          class="w100% h64! bdr-14 bg-[#4D51D2] border-none py-22 text-18 <md:(h49! bdr10 text-14)"
          type="primary"
          @click="getSolanaWeb"
          >{{
            $t('connect to', {
              chainName: userStore.depositCurrency.chainName.replace(
                /Mainnet|Testnet/,
                $t('and confirm')
              )
            })
          }}
        </el-button>
        <el-button
          v-else
          :loading="state.loading"
          :disabled="state.loading"
          class="w100% h64! bdr-14 bg-[#4D51D2] border-none py-22 text-18 <md:(h49! bdr10 text-14)"
          type="primary"
          @click="tronSubmit(ruleFormRef)"
          >{{ $t('confirm') }}
        </el-button>
      </el-form-item>
      <el-form-item class="mt-10" v-else>
        <el-button
          v-if="userStore.depositCurrency.chainOriginalId !== chainId"
          :loading="state.loading"
          :disabled="state.loading"
          class="w100% h64! bdr-14 bg-[#4D51D2] border-none py-22 text-18 <md:(h49! bdr10 text-14)"
          type="primary"
          @click="walletSwitchChain(userStore.depositCurrency.chainOriginalId)"
          >{{
            $t('Switch to', {
              chainName: userStore.depositCurrency.chainName.replace(
                /Mainnet|Testnet/,
                $t('and confirm')
              )
            })
          }}
        </el-button>
        <el-button
          v-else
          :loading="state.loading"
          :disabled="state.loading"
          class="w100% h64! bdr-14 bg-[#4D51D2] border-none py-22 text-18 <md:(h49! bdr10 text-14)"
          type="primary"
          @click="submitForm(ruleFormRef)"
          >{{ account ? $t('confirm') : $t('Connect Wallet') }}</el-button
        >
      </el-form-item>
-->
      <el-form-item class="mt-10">
        <el-button
          v-if="showConfirmBtnHandler"
          :loading="state.loading"
          :disabled="state.loading"
          class="w100% h40! bdr-8 bg-to5 border-none! text-16! text-c15! font-['OutfitMedium'] font-700! <md:(h40! bdr8 text-14!)"
          type="primary"
          @click="linkChain"
          >{{ btnText }}
        </el-button>
        <el-button
          v-else
          :loading="state.loading"
          :disabled="state.loading"
          class="w100% h40! bdr-8 bg-to5 border-none! text-16! text-c15! font-['OutfitMedium'] font-700! <md:(h40! bdr8 text-14!)"
          type="primary"
          @click="confirmTransfer(ruleFormRef)"
          >{{ account ? $t('confirm') : $t('Connect Wallet') }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
  <!-- 弹框 -->
  <searchChain
    :getChainData="getChainData"
    v-model="showPopup"
    :chainData="userStore.depositCurrency"
  />
</template>
<script setup>
import {
  ChainId,
  addresses,
  getAddress,
  balanceTokens,
  tokenMap,
  unserializedTokens,
  useActiveWebStateRefs,
  useApproveToken,
  useTokenAllowance,
  useAllTokenBalance,
  useLaunchBridgeContract,
  useTronUsdtContract,
  fromReadableAmount,
  formatNumber,
  BASE_CHAIN_ID,
  ETHEREUM_CHAIN,
  walletSwitchChain,
  walletChangeChain,
  getActiveLibrary,
  connectWallet,
  useBtcWebStateRefs,
  connectBtc,
  getBtcBalanceWatch,
  accountsChanged,
  isAddress,
  useTronWebStateRefs,
  getTronWeb,
  initTronConnect,
  toReadableAmount,
  Decimals,
  TokenInfo,
  ChainList,
  useTronWebState,
  useActiveWebState,
  getERC20Contract,
  getRpcProviderByChain,
  addressFormats,
  isTronAddress,
  useTonWebStateRefs,
  getTonWeb,
  tonSend,
  useSolanaWebStateRefs,
  getSolanaWeb,
  getTonUsdtBalance,
  isTonAddress,
  getSolanaBalance,
  handleSolanaTransFer
} from '@/web3-sdk';
import { computed, onMounted, reactive, ref, watch, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store/modules/user.js';
import { ElMessage } from 'element-plus';
import borderGradient from '@/components/borderGradient.vue';
import { useCommonStore } from '@/store/modules/common.js';
import { against } from '@/utils/against.js';
import { contractReceiveAddressApi, transactionCreateApi } from '@/api';
import errorIcon from '@/components/errorIcon.vue';
import BigNumber from 'bignumber.js';
import TokenWebView from '@consenlabs-fe/webview';
import tp from 'tp-js-sdk';
import { ethers } from 'ethers';

import btcIcon from '@/assets/img/home/btc.png';
import usdtIcon from '@/assets/img/token/usdt.png';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const ruleFormRef = ref();
const numberInputRef = ref();
const userStore = useUserStore();
const commonStore = useCommonStore();

const { chainId, account } = useActiveWebStateRefs();
const { getBtcAccount, getBalance, ...btcWebState } = useBtcWebStateRefs();
const tronWebState = useTronWebStateRefs();
const tonWebState = useTonWebStateRefs();
const solanaWebState = useSolanaWebStateRefs();

const { allBalance, tokenBalanceLoading, fetchHandle } = useAllTokenBalance('depositCurrency');
const { btcBalanceLoading, getBtcBalanceFunc } = getBtcBalanceWatch('depositCurrency');

// 表单的内容
const state = reactive({
  number: null,
  symbol: '',
  address: '',
  loading: false
});
const addressValidator = (rule, value, callback) => {
  // const symbol = userStore.depositCurrency.nativeCurrency.symbol;
  // 是否是BTC地址
  // const regs = addressFormats[import.meta.env.VITE_BTC_ADDRESS_REG];
  // let isBtcAddress = false;
  // for (let reg in regs) {
  //   if (regs[reg].test(value)) {
  //     isBtcAddress = true;
  //     break;
  //   }
  // }
  if (
    // value === '' ||
    // (symbol === 'BTC' && !isBtcAddress) ||
    // (symbol === 'TRX' && !isTronAddress(value)) ||
    // (symbol !== 'BTC' && symbol !== 'TRX' && !isAddress(value))
    value === '' ||
    !isAddress(value)
  ) {
    callback(t('Please enter the correct wallet address'));
  } else {
    callback();
  }
};

const depositQuantity = (rule, value, callback) => {
  const symbol = userStore.depositCurrency.nativeCurrency.symbol;
  if (
    value === '' ||
    (symbol === 'TON' && !isTonAddress(tonUsdtBalance.value) && Number(value) <= 0)
  ) {
    callback(t('Please enter the deposit quantity'));
  } else {
    callback();
  }
};

// 表单规则
const rules = computed(() => {
  return {
    number: [
      { required: true, message: t('Please enter the deposit quantity') },
      {
        validator: depositQuantity,
        trigger: 'blur'
      }
    ],
    symbol: [{ required: true, message: t('please choose') }],
    address: [
      {
        required: true,
        message: t('Please enter your wallet address')
      },
      {
        validator: addressValidator,
        trigger: 'blur'
      }
    ]
  };
});

const setMaxValue = () => {
  if (isBtc.value) {
    state.number = getBalance.value;
  } else if (isTron.value) {
    state.number = tronBalance.value;
  } else if (isTon.value) {
    state.number = tonUsdtBalance.value;
  } else if (isSolana.value) {
    state.number = solanaBalance.value;
  } else {
    state.number = allBalance.max;
  }
};
const symbolChange = () => {
  numberInputRef.value.resetField();
};
const changeNum = (val) => {
  // console.log('val', isBtc.value, val, getBalance);
  if (isBtc.value) {
    if (Number(val) > Number(getBalance.value)) {
      state.number = Number(getBalance.value);
    }
  } else if (isTron.value) {
    if (Number(val) > Number(tronBalance.value)) {
      state.number = Number(tronBalance.value);
    }
  } else if (isTon.value) {
    if (Number(val) > Number(tonUsdtBalance.value)) {
      state.number = Number(tonUsdtBalance.value);
    }
  } else if (isSolana.value) {
    if (Number(val) > Number(solanaBalance.value)) {
      state.number = Number(solanaBalance.value);
    }
  } else {
    if (Number(val) > Number(allBalance.value)) {
      state.number = Number(allBalance.value);
    }
  }
};
const { approveHandle } = useApproveToken();
const contractAddress = computed(() =>
  getAddress(addresses.ChainConnect, userStore.depositCurrency.chainOriginalId)
);
const LaunchBridgeContract = useLaunchBridgeContract(contractAddress);

function delay(timeout) {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove();
    }, timeout);
  });
}

// 链接链或者切换链
const linkChain = () => {
  const symbolVal = userStore.depositCurrency.nativeCurrency.symbol;
  const chainOriginalId = userStore.depositCurrency.chainOriginalId;
  switch (symbolVal) {
    case 'BTC':
      connectBtc('depositCurrency');
      break;
    case 'TRX':
      getTronWeb();
      break;
    case 'TON':
      getTonWeb();
      break;
    case 'SOLANA':
      getSolanaWeb();
      break;
    default:
      // EVM链
      walletSwitchChain(chainOriginalId);
      break;
  }
};

// 每个链的确认转账
const confirmTransfer = (ruleFormRef) => {
  const symbol = userStore.depositCurrency.nativeCurrency.symbol;
  switch (symbol) {
    case 'BTC':
      btcSubmitForm(ruleFormRef);
      break;
    case 'TRX':
      tronSubmit(ruleFormRef);
      break;
    case 'TON':
      tonSubmit(ruleFormRef);
      break;
    case 'SOLANA':
      solanaSubmit(ruleFormRef);
      break;
    default:
      // EVM链
      submitForm(ruleFormRef);
      break;
  }
};

// 是否显示确认按钮
const showConfirmBtnHandler = computed(() => {
  const symbolval = userStore.depositCurrency.nativeCurrency.symbol;
  let isShow = false;
  switch (symbolval) {
    case 'BTC':
      isShow = !btcWebState.btcAccount.value;
      break;
    case 'TRX':
      isShow = !tronWebState._account.value;
      break;
    case 'TON':
      isShow = !tonWebState._account.value;
      break;
    case 'SOLANA':
      isShow = !solanaWebState._account.value;
      break;
    default:
      // EVM链
      isShow = userStore.depositCurrency.chainOriginalId !== chainId.value;
      break;
  }
  return isShow;
});

// ETH链转账
const onSubmitPledge = async () => {
  if (state.loading) return;
  const chainId = userStore.depositCurrency.chainOriginalId;
  const symbol = userStore.depositCurrency.nativeCurrency.symbol;
  state.loading = true;
  const token = state.symbol;
  const toAddress = account.value;
  const tokenValue = state.number;
  const decimals = userStore.depositCurrency.nativeCurrency.decimals;

  const userInputValue = fromReadableAmount(tokenValue, Decimals.USDT[chainId]);
  console.log('asdasdasd', contractAddress, symbol);
  //获取主币/判断当前是有对应的主币给与手续费用
  console.log(tronBalance.value);
  const rpcProvider = getRpcProviderByChain(chainId);
  const balance = await rpcProvider.getBalance(toAddress);
  const num = Number(toReadableAmount(balance, decimals));

  if (num === 0) {
  console.log(balance, 'balance');
    state.loading = false;
    ElMessage({
      message: t('symbolTips', { symbol:symbol }),
      type: 'error'
    });
    return;
  }
  const provider = getActiveLibrary();
  const signer = await provider.getSigner();

  const contract = getERC20Contract(getAddress(addresses[token], chainId), signer);
  // 估算 gas
  const estimatedGas = await contract.estimateGas.approve(
    getAddress(addresses.ChainConnect, chainId),
    userInputValue
  );
  // 乘以 MetaMask 安全 buffer，比如 1.3
  const bufferedGasLimit = estimatedGas.mul(13).div(10);

  const feeData = await provider.getFeeData();

  let gasCost;
  if (feeData.maxFeePerGas && feeData.maxPriorityFeePerGas) {
    // EIP-1559 模式
    gasCost = bufferedGasLimit.mul(feeData.maxFeePerGas);
  } else {
    // 旧模式
    gasCost = bufferedGasLimit.mul(feeData.gasPrice);
  }
  const feeInEth = ethers.utils.formatEther(gasCost);
  if (num < feeInEth) {
    state.loading = false;
    ElMessage({
      message: t('symbolTips',{symbol:symbol}),
      type: 'error'
    });
    return;
  }
  //   // 2. 获取当前 Gas Price
  //   const gasPrice = await provider.getGasPrice(); // 单位：wei
  //   // 3. 模拟 MetaMask 行为：Gas Limit 加 buffer（30%）
  //   const gasLimitBuffered = estimatedGas.mul(130).div(100);
  //   // 4. 计算总费用（wei）
  //   const totalGasCost = gasLimitBuffered.mul(gasPrice);
  //     const gasPriceInGwei = Number(ethers.utils.formatUnits(gasPrice, "gwei"));
  //   const totalCostInEth = Number(ethers.utils.formatEther(totalGasCost));
  //       // const formatted = ethers.utils.formatEther(totalCost);
  // console.log(gasPrice,gasLimitBuffered,gasLimitBuffered)
  // console.log(gasPriceInGwei,totalCostInEth)

  // const contract = getERC20Contract(getAddress(addresses[token], chainId), signer);
  // const estimatedGas = await contract.estimateGas.transfer(account.value, userInputValue);
  // // 获取当前 gas price（单位：wei）
  // const gasPrice = await provider.getGasPrice(); // BigNumber
  // // 计算实际的费用（单位：wei）
  // const totalCost = estimatedGas.mul(gasPrice); // BigNumbe
  // console.log('Estimated Gas:', estimatedGas.toString());
  // // 转换为 ETH/BNB 单位
  // const formatted = ethers.utils.formatEther(totalCost);
  // const formatteds = toReadableAmount(gasPrice,decimals);

  //   console.log("预计 gas:", estimatedGas.toString());
  // console.log("当前 gas price:", gasPrice.toString());
  // console.log("预估主币花费:", formatted); // 例如: 0.00123 BNB
  // console.log("预估主币花费:", formatteds); // 例如: 0.00123 BNB

  // return;
  // 授权
  const approve = async (approveValue) => {
    try {
      console.log(addresses, 'addresses', token);
      const receipt = await approveHandle(
        getAddress(addresses[token], chainId),
        getAddress(addresses.ChainConnect, chainId),
        approveValue
      );
      console.log('receipt：', receipt);
    } catch (error) {
      console.log('error：', { error });
      if (error.code === 'ACTION_REJECTED') {
        state.loading = false;
        return;
      } else if ([ChainId.BSC_TESTNET, ChainId.BSC_MAINNET].includes(chainId)) {
        // 币安链报错不用管，也算成功，延迟3秒，防止授权交易还没成功
        await delay(1000 * 3);
      }
    }
  };

  // 如果是旧版USDT。需要先获取已授权代币，判断是授权代币是否满足要操作的数量 userInputValue
  // 不满足就先撤销授权，然后再授权足够的代币
  // 满足就直接下一步
  const isEthereum =
    [ChainId.ETH_MAINNET, ChainId.ETH_TESTNET].includes(chainId) && token === 'USDT';
  if (isEthereum) {
    try {
      const contract = getERC20Contract(
        getAddress(addresses[token], chainId),
        getRpcProviderByChain(chainId)
      );
      const allowanceRes = await contract.allowance(
        toAddress,
        getAddress(addresses.ChainConnect, chainId)
      );
      console.log('allowance res：', allowanceRes, userInputValue);
      // 大于等于需要操作的数量，直接进行转账就行
      if (allowanceRes.gte(userInputValue)) {
        console.log('已授权代币足够使用');
      } else if (allowanceRes.lte(0)) {
        console.log('需要授权代币');
        // 小于等于0，没有授权代币数量，就直接授权
        await approve(userInputValue);
      } else {
        console.log('需要先撤销，然后再授权代币');
        // 已授权代币小于要操作的数量，并且大于0，就需要先取消授权
        // 撤销授权，方法是授权0个代币
        await approve(0);
        await approve(userInputValue);
      }
    } catch (error) {
      console.log('allowance error：', error);
      return;
    }
  } else {
    await approve(userInputValue);
  }
  console.log('toAddress', toAddress);
  try {
    const res = await LaunchBridgeContract.value['transformAIChain'](
      userInputValue,
      state.address,
      BASE_CHAIN_ID,
      getAddress(addresses[token], chainId)
    );

    const tx = await res.wait();
    console.log('res：', res, tx);

    fetchHandle(state.symbol);
    ElMessage({
      message: t('Deposit successful'),
      type: 'success'
    });

    symbolChange();
  } catch (error) {
    console.log('失败：', { error });
    if (error.code === 'ACTION_REJECTED') {
      return;
    } else if ([ChainId.BSC_TESTNET, ChainId.BSC_MAINNET].includes(chainId)) {
      // 如果是币安链，报错也算成功
      fetchHandle(state.symbol);
      ElMessage({
        message: t('Deposit successful'),
        type: 'success'
      });
      symbolChange();
    }
    console.log('catch error：', error);
  } finally {
    state.loading = false;
  }
};
// 点击确认按钮
const submitForm = (formEl) => {
  if (!formEl) return;
  if (!account.value) {
    return connectWallet();
  }
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!', state);
      onSubmitPledge();
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

// BTC确认按钮
const btcSubmitForm = (formEl) => {
  if (!formEl) return;
  if (!getBtcAccount.value) {
    return connectBtc('depositCurrency');
  }
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!', state);
      btcTransFer();
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

// BTC转账
const btcTransFer = async () => {
  try {
    if (state.loading) return;
    const chainId = userStore.depositCurrency.chainOriginalId;
    const token = state.symbol;
    const toAddress = state.address;
    const tokenValue = state.number;
    const tronAddress = getBtcAccount.value;
    state.loading = true;
    const res = await contractReceiveAddressApi({
      chainId: chainId,
      token
    });
    console.log('BTC', res);

    if (res && !res.hasErrors) {
      const num = new BigNumber(tokenValue);
      const userInputValue = num.multipliedBy(100000000).toNumber();
      const txid = await unisat.sendBitcoin(res.data, userInputValue);
      const obj = {
        address: tronAddress,
        token,
        fromChain: chainId,
        toChain: BASE_CHAIN_ID,
        toAddress,
        amount: tokenValue,
        txHash: txid
      };
      await transactionCreateApi(obj);
      getBtcBalanceFunc();
      setTimeout(() => {
        getBtcBalanceFunc();
      }, 3000);
      symbolChange();
    }
  } catch (error) {
  } finally {
    state.loading = false;
  }
};

const getChainData = (data) => {
  userStore.depositCurrency = data;
};
const showPopup = ref(false);
const switchChain = () => {
  showPopup.value = true;
};

const isBtc = ref(userStore.depositCurrency.nativeCurrency.symbol === 'BTC');
const isTron = ref(userStore.depositCurrency.nativeCurrency.symbol === 'TRX');
const isTon = ref(userStore.depositCurrency.nativeCurrency.symbol === 'TON');
const isSolana = ref(userStore.depositCurrency.nativeCurrency.symbol === 'SOLANA');

// 是否显示钱包地址
const isShowAddress = ref(false);
// 显示地址
const showAddress = ref('');
const isShowAddressHandler = (symbol) => {
  // 需要显示的链
  const showChain = ['BTC', 'TRX', 'TON', 'SOLANA'];
  const isShow = showChain.includes(symbol);
  isShowAddress.value = isShow;
  let address = '';
  switch (symbol) {
    case 'BTC':
      address = getBtcAccount.value;
      break;
    case 'TRX':
      address = tronWebState.account.value;
      break;
    case 'TON':
      address = tonWebState._account.value;
      break;
    case 'SOLANA':
      address = solanaWebState._account.value;
      break;
  }
  showAddress.value = against(address) || '--';
};

// 按钮文字
const btnText = ref(
  t('connect to', {
    chainName: userStore.depositCurrency.chainName.replace(/Mainnet|Testnet/, t('and confirm'))
  })
);
const btnTextHandler = (symbol) => {
  const showChain = ['BTC', 'TRX', 'TON', 'SOLANA'];
  const isShow = showChain.includes(symbol);
  if (isShow) {
    btnText.value = t('connect to', {
      chainName: userStore.depositCurrency.chainName.replace(/Mainnet|Testnet/, t('and confirm'))
    });
  } else {
    btnText.value = t('Switch to', {
      chainName: userStore.depositCurrency.chainName.replace(/Mainnet|Testnet/, t('and confirm'))
    });
  }
};

// watch(
//   () => userStore.depositCurrency.nativeCurrency.symbol,
//   async (newSymbol) => {
//     isBtc.value = newSymbol === 'BTC';
//     isTron.value = newSymbol === 'TRX';
//     state.symbol = newSymbol === 'BTC' ? 'BTC' : 'USDT';
//     if (newSymbol === 'BTC') accountsChanged();
//     if (newSymbol === 'TRX') {
//       await getTronWeb();
//     }
//   }
// );
//波场余额
const tronBalance = ref(0);
const tronBalanceLoading = ref(false);
// 获取波场余额
const getTronBalance = async (account) => {
  console.log('获取波场余额');
  const tronUsdt = useTronUsdtContract(contractAddress);
  tronBalanceLoading.value = true;

  try {
    const balance = await tronUsdt.value.balanceOf(account).call();
    const res = toReadableAmount(balance, 6);
    const dotIndex = res.indexOf('.');
    tronBalance.value = res.slice(0, dotIndex + 3);
  } catch (error) {
    console.log('error', error);
  } finally {
    tronBalanceLoading.value = false;
  }
};

// tonusdt余额
const tonUsdtBalance = ref(0);

// solana余额
const solanaBalance = ref(0);
const handleSolanaBalance = async (account) => {
  const res = await getSolanaBalance();
  solanaBalance.value = res;
};

// 余额显示
const balance = ref(0);
// 余额logo显示
const balanceLogo = ref(usdtIcon);
const balanceHandler = (symbol) => {
  let num = 0;
  switch (symbol) {
    case 'BTC':
      num = getBalance.value;
      break;
    case 'TRX':
      num = tronBalance.value;
      break;
    case 'TON':
      num = tonUsdtBalance.value;
      break;
    case 'SOLANA':
      num = solanaBalance.value;
      break;
    default:
      num = allBalance.max;
      break;
  }
  balance.value = num;

  if (symbol === 'BTC') {
    balanceLogo.value = btcIcon;
  } else {
    balanceLogo.value = usdtIcon;
  }
};

// 波场转账
async function tronTransFer() {
  try {
    if (state.loading) return;
    const chainId = userStore.depositCurrency.chainOriginalId;
    const token = state.symbol;
    const toAddress = state.address;
    const tokenValue = state.number;
    const tronAddress = tronWebState.account.value;
    state.loading = true;
    const res = await contractReceiveAddressApi({
      chainId: chainId,
      token
    });
    if (res && !res.hasErrors) {
      const userInputValue = fromReadableAmount(
        tokenValue,
        Decimals.USDT[userStore.depositCurrency.chainOriginalId]
      );
      console.log('userInputValue', userInputValue);
      // 波场合约
      const tronUsdtContract = useTronUsdtContract(contractAddress);
      const receipt = await tronUsdtContract.value.transfer(res.data, userInputValue).send();
      const obj = {
        address: tronAddress,
        token,
        fromChain: chainId,
        toChain: BASE_CHAIN_ID,
        toAddress,
        amount: tokenValue,
        txHash: receipt
      };
      const result = await transactionCreateApi(obj);
      getTronBalance(tronAddress);
      symbolChange();
    }
  } catch (error) {
  } finally {
    state.loading = false;
  }
}

// 点击波场按钮
const tronSubmit = async (formEl) => {
  if (!formEl) return;
  const { setAccount } = useActiveWebState();
  if (!tronWebState.account.value) {
    return getTronWeb();
  }
  // if (!account.value) {
  //   const isTp = tp.isConnected();

  //   if (isTp && window.tronWeb) {
  //     const wallet = await tp.getWallet({ walletTypes: ['eth'] });
  //     setAccount(wallet.data.address);
  //     // window.location.reload()
  //     return false;
  //   } else {
  //     return connectWallet();
  //   }
  // }
  formEl.validate((valid) => {
    if (valid) {
      tronTransFer();
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

// 选择代币切换
const changeSymbol = (item) => {
  if (item.symbol === 'USDT' || item.symbol === 'BTC') {
    acSymbol.value = item;
    state.symbol = item.symbol;
    return false;
  }
  noUsdt(item.symbol);
};

const noUsdt = (symbol) => {
  ElMessage({
    message: symbol + ' ' + t('Coming soon'),
    type: 'error',
    customClass: 'no_usdt',
    icon: errorIcon
  });
};

// TON转账确认
const tonSubmit = async (formEl) => {
  const tonAddress = tonWebState.account.value;

  if (!formEl) return;
  if (!tonAddress) {
    // 链接TON钱包
    return getTonWeb();
  }
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!', state);
      tonTransfer();
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

// TON转账
const tonTransfer = async () => {
  console.log('TON转账');
  try {
    if (state.loading) return;
    const chainId = userStore.depositCurrency.chainOriginalId;
    const token = state.symbol;
    const tokenValue = state.number;
    const tonAddress = tonWebState.account.value;
    const toAddress = state.address;
    state.loading = true;
    const res = await contractReceiveAddressApi({
      chainId: chainId,
      token
    });
    if (res && !res.hasErrors) {
      const receiptAddress = res.data;
      const tonRes = await tonSend(receiptAddress, tokenValue);
      console.log('tonRes', tonRes);
      if (!tonRes) return;
      const obj = {
        address: tonAddress,
        token,
        fromChain: chainId,
        toChain: BASE_CHAIN_ID,
        toAddress,
        amount: tokenValue,
        txHash: ''
      };
      const result = await transactionCreateApi(obj);
      if (result && !result.hasErrors) {
        await getTonUsdtBalanceFunc(tonAddress);
        symbolChange();
      }
    }
  } catch (error) {
    console.log('TONerror', error);
  } finally {
    state.loading = false;
  }
};

// SOLANA转账确认
const solanaSubmit = async (formEl) => {
  const solanaAddress = solanaWebState.account.value;
  if (!formEl) return;
  if (!solanaAddress) {
    // 链接TON钱包
    return getSolanaWeb();
  }
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!', state);
      solanaTransFer();
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const solanaTransFer = async () => {
  try {
    if (state.loading) return;
    const chainId = userStore.depositCurrency.chainOriginalId;
    const token = state.symbol;
    const tokenValue = state.number;
    const solanaAddress = solanaWebState.account.value;
    const toAddress = state.address;
    state.loading = true;
    const res = await contractReceiveAddressApi({
      chainId: chainId,
      token
    });
    if (res && !res.hasErrors) {
      const txid = await handleSolanaTransFer(res.data, tokenValue);
      if (!txid) return;
      const obj = {
        address: solanaAddress,
        token,
        fromChain: chainId,
        toChain: BASE_CHAIN_ID,
        toAddress,
        amount: tokenValue,
        txHash: txid
      };
      const result = await transactionCreateApi(obj);
      if (result && !result.hasErrors) {
        symbolChange();
        setTimeout(async () => {
          await getSolanaBalance();
        }, 1000);
      }
    }
  } catch (error) {
    console.log('转账失败', error);
  } finally {
    state.loading = false;
  }
};

onMounted(() => {
  commonStore.allChainList = ChainList;
  console.log('TP钱包', window, window.unisat);
});

// 选中的代币信息
const acSymbol = ref({});
// 选择链的代币
const symbols = ref([]);
watch(
  () => userStore.depositCurrency,
  async (newCurrency) => {
    const newSymbol = newCurrency.nativeCurrency.symbol;
    console.log('newCurrencyaaaa', newSymbol);
    symbols.value = TokenInfo[newCurrency.chainOriginalId];
    state.symbol = TokenInfo[newCurrency.chainOriginalId][0].symbol;
    acSymbol.value = TokenInfo[newCurrency.chainOriginalId][0];
    isBtc.value = newSymbol === 'BTC';
    isTron.value = newSymbol === 'TRX';
    isTon.value = newSymbol === 'TON';
    isSolana.value = newSymbol === 'SOLANA';
    isShowAddressHandler(newSymbol);
    balanceHandler(newSymbol);
    btnTextHandler(newSymbol);
    // if (newSymbol !== 'BTC' || newSymbol !== 'TRX') state.address = account.value;
    switch (newSymbol) {
      case 'BTC':
        accountsChanged();
        break;
      case 'TRX':
        getTronWeb();
        break;
      // case 'TON':
      //   getTonWeb();
      //   break;
      // case 'SOLANA':
      //   getSolanaWeb();
      //   break;
    }
  },
  {
    immediate: true
  }
);
watch(
  [tronWebState.account, () => userStore.depositCurrency.nativeCurrency.symbol],
  ([newAccount, newSymbol]) => {
    if (!newAccount) {
      tronBalance.value = 0;
    } else if (newAccount && newSymbol === 'TRX' && !tronBalanceLoading.value) {
      getTronBalance(newAccount);
    }
  },
  {
    immediate: true
  }
);

watch(
  () => account.value,
  (newAccount) => {
    if (newAccount && !state.address) state.address = newAccount;
  },
  {
    immediate: true
  }
);

watch(
  () => [
    allBalance.value,
    tronBalance.value,
    getBalance.value,
    tonUsdtBalance.value,
    solanaBalance.value
  ],
  () => {
    balanceHandler(userStore.depositCurrency.nativeCurrency.symbol);
  },
  {
    immediate: true
  }
);

const getTonUsdtBalanceFunc = async (account) => {
  const symbol = userStore.depositCurrency.nativeCurrency.symbol;
  const balance = await getTonUsdtBalance(account);
  tonUsdtBalance.value = balance;
  balanceHandler(symbol);
};

// 监听TON钱包地址发生变化
watch(
  () => [tonWebState._account.value, userStore.depositCurrency.nativeCurrency.symbol],
  async ([newAccount, newSymbol]) => {
    if (newAccount && newSymbol === 'TON') {
      isShowAddressHandler(newSymbol);
      await getTonUsdtBalanceFunc(newAccount);
    }
  },
  {
    immediate: true
  }
);

// 监听Solana钱包地址发生变化
watch(
  () => [solanaWebState._account.value, userStore.depositCurrency.nativeCurrency.symbol],
  async ([newAccount, newSymbol]) => {
    if (newAccount && newSymbol === 'SOLANA') {
      isShowAddressHandler(newSymbol);
      await handleSolanaBalance();
    }
  },
  {
    immediate: true
  }
);
</script>
<style scoped lang="scss">
:deep(.el-divider--horizontal) {
  border-color: var(--border-color);
}

:deep(.el-divider__text) {
  background: var(--bg6);
}

:deep(.el-select__selection) {
  gap: 0;
}

:deep(.address_input .el-input__inner) {
  font-size: 14px !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
}

.deposit {
  .down_arrow {
    transform: translate(-50%, calc(-50% - 5px));
  }

  .receive_num {
    background-image: linear-gradient(180deg, #5ac27c 0%, #b2e235 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

@media (max-width: 640px) {
  .value-wrap,
  .value-num {
    :deep(.el-input__inner::-webkit-input-placeholder) {
      font-size: 13px !important;
    }
  }

  .value-num {
    :deep(.el-input__inner) {
      font-size: 24px;
    }
  }
}

.value-wrap {
  :deep(.el-input__wrapper) {
    border-radius: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  }

  :deep(.el-input__inner) {
    font-size: 14px;
    color: #fff;
    font-family: 'OutfitMedium';

    &::-webkit-inner-spin-button {
      display: none !important;
      -webkit-appearance: none;
    }
  }
}

.value-num {
  :deep(.el-input__inner) {
    font-size: 28px;
    color: #fff;
    font-family: 'OrbitronBold';

    &::placeholder {
      font-size: 14px;
    }

    &::-webkit-inner-spin-button {
      display: none !important;
      -webkit-appearance: none;
    }
  }
}

:deep(.el-select__wrapper) {
  background: rgba(79, 115, 163, 0);
  box-shadow: none;
  // width: 140px;
  justify-content: flex-end;

  .el-select__selected-item {
    color: #000;
    font-size: 16px;
    font-weight: bold;
    position: static;
    transform: none;
    width: auto;

    &.is-hidden {
      width: 0;
    }
  }
}

:deep(.el-form-item.is-error .el-input__wrapper) {
  box-shadow: none;
}

:deep(.el-input__wrapper) {
  background: rgba(79, 115, 163, 0);
  box-shadow: none;
  margin: 0;
  padding: 0;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

.token-logo {
  display: inline-block;
  width: 24px;
  margin-right: 10px;
  vertical-align: middle;
}

:deep(.no_usdt_curr) {
  cursor: not-allowed;
  background: none;

  &::hover {
    background: none;
  }
}

:deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
  background: none;
}

:deep(.error_tips) {
  .el-form-item__content {
    .el-form-item__error {
      margin-top: 2px;
    }
  }
}

:deep(.error_tips_two) {
  .el-form-item__content {
    .el-form-item__error {
      margin-top: 10px;
    }
  }
}
</style>
