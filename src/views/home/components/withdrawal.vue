<template>
  <div>
    <!-- 提现组件 -->
    <div class="withdrawal w100% pt10 pb16 <md:(py15)" text="14 c9 ">
      <!-- <el-divider>
        <span class="font-500 text-14 text-[#B1B1B1]">{{ $t('from') }}</span>
      </el-divider> -->
      <div class="h70 px16 fyc bg-bg12 bdr8 <md:(h45 )">
        <img class="w30 h30 <md:(w19 h19)" src="@/assets/img/home/novai.png" alt="" />
        <span sm="text-14" class="text-14 text-c9 ml-10">{{
          ETHEREUM_CHAIN[BASE_CHAIN_ID].chainName
        }}</span>
      </div>

      <el-form
        ref="ruleFormRef"
        :model="state"
        :rules="rules"
        label-width="0"
        class="demo-ruleForm"
      >
        <div class="bg-bg12 border-rd-t-8 p16 my10">
          <div class="error_tips h34 bdr-14 fyb <md:(bdr10 h45)">
            <el-form-item ref="numberInputRef" class="flex-1 value-num" prop="number">
              <el-input
                class="border-none"
                @input="changeNum"
                :placeholder="$t('Withdrawal quantity')"
                v-model="state.number"
                type="number"
                autocomplete="off"
              />
            </el-form-item>
            <div class="fyc cursor-pointer h34 bdr17 p1" border="1 solid line1">
              <el-dropdown trigger="click" placement="bottom-end" @command="changeSymbol">
                <span class="fyc">
                  <img :src="acSymbol.img" alt="" class="w30 h30 <md:(w19 h19)" />
                  <span class="mx8 <md:(mx10 text-13)" text="16 c9">{{ acSymbol.name }}</span>
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
                      <span class="ml15 <md:(text-13)" text="16 c13">{{ item.name }}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <!-- <div class="fyc">
            <img class="w26 h26 mr9 <md:(w19 h19)" src="@/assets/img/home/usdt.png" />
            <span text="16 c13" class="<md:text-13">USDT</span>
          </div> -->
          </div>

          <div class="mt-20 font-500 text-14 text-c9 flex items-center justify-end">
            <div class="fyc mr8">
              <el-icon v-if="tokenBalanceLoading" class="is-loading" color="#5AC27C">
                <Loading />
              </el-icon>
              <span class="text-14 text-c14 <md:text-14"> {{ $t('Balance') }} </span>
              <img class="token-logo w22 h22 mx <md:(w19 h19)" :src="acSymbol.img" />
              <span class="text-14 text-c14 <md:text-14">{{ allBalance.max }}</span>
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

        <!-- <el-divider>
          <span class="font-500 text-14 text-[#B1B1B1]">{{ $t('to') }}</span>
        </el-divider> -->
        <div class="relative">
          <div class="down_arrow w64 h42 bg-[#0F1111] bdr21 fcc" position="absolute left-50%">
            <div class="w48 h26 bg-to5 fcc bdr23">
              <img src="@/assets/img/home/arrive.svg" class="w13 <md:(w14)" alt="" />
            </div>
          </div>
        </div>
        <div class="bg-bg12 border-rd-b-8 p16 pb20">
          <div class="cursor-pointer h50 fyc <md:(h45 )" @click="switchChain">
            <img class="w26 h26 <md:(w19 h19)" :src="userStore.withdrawCurrency.icon" alt="" />
            <span sm="text-14" class="text-14 text-c9 ml-10">{{
              userStore.withdrawCurrency.chainName
            }}</span>
            <img src="@/assets/img/home/arrow.svg" alt="" class="mlauto w14" />
          </div>
          <el-form-item class="error_tips_two h40 enter_address" prop="address">
            <el-input
              v-model="state.address"
              clearable
              :placeholder="$t('Please enter your wallet address')"
              class="border-none h100%"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
        </div>

        <!-- <el-form-item class="flex-1 value-wrap" prop="address" v-if="isShowMore">
          <el-select
            v-model="state.address"
            :placeholder="$t('Please select a wallet address')"
            clearable
            filterable
            allow-create
            default-first-option
            class="select_address mt20 bdr-14"
            border="1 solid line"
          >
            <el-option :label="account" :value="account" />
            <template #suffix>
              <el-icon class="el-input__icon">
                <calendar />
              </el-icon>
            </template>
          </el-select>
        </el-form-item> -->

        <!-- <p sm="text-16 mt-20" class="font-500 text-12 text-c8 mt-10 text-center">
          {{ $t('You will receive') }}
          <span class="text-c12">{{ state.number || 0 }} {{ $t('earnings', { eth: state.symbol }) }}</span>
  
        </p> -->
        <div class="text-c14 font-500 text-16 <md:(text-14 mt-10)">
          <div class="fyb pt-10 <md:pt-10">
            <span> {{ $t('You will receive') }}：</span>
            <span class="receive_num" font="bold"
              >{{ state.number || 0 }} {{ $t('earnings', { eth: state.symbol }) }}</span
            >
          </div>
          <div class="fyb pt-5">
            <span>{{ $t('Fee') }}：</span>
            <span class="receive_num_white" font="bold">{{ getFee || 0 }} {{ state.symbol }}</span>
          </div>
        </div>
        <el-form-item class="mt-10">
          <el-button
            v-if="
              acSymbol.symbol === 'ETH' ||
              acSymbol.symbol === 'USDC' ||
              acSymbol.symbol === 'WBTC' ||
              acSymbol.symbol === 'BNB'
            "
            class="w100% h40! bdr-8 bg-to5 border-none! text-16! text-c15! font-['OutfitMedium'] font-700! <md:(h40! bdr8 text-14!)"
            type="primary"
            @click="noUsdt"
            >{{ $t('confirm') }}</el-button
          >
          <el-button
            v-else-if="BASE_CHAIN_ID !== chainId"
            :loading="state.loading"
            :disabled="state.loading"
            class="w100% h40! bdr-8 bg-to5 border-none! text-16! text-c15! font-['OutfitMedium'] font-700! <md:(h40! bdr8 text-14!)"
            type="primary"
            @click="walletSwitchChain(BASE_CHAIN_ID)"
            >{{
              $t('Switch to', {
                chainName: ETHEREUM_CHAIN[BASE_CHAIN_ID].chainName.replace(
                  /Mainnet|Testnet/,
                  $t('and confirm')
                )
              })
            }}</el-button
          >
          <el-button
            v-else
            :loading="state.loading"
            :disabled="state.loading"
            class="w100% h40! bdr-8 bg-to5 border-none! text-16! text-c15! font-['OutfitMedium'] font-700! <md:(h40! bdr8 text-14!)"
            type="primary"
            @click="submitForm(ruleFormRef)"
            >{{ account ? $t('confirm') : $t('Connect Wallet') }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 弹框 -->
    <searchChain
      :getChainData="getChainData"
      v-model="showPopup"
      :chainData="userStore.withdrawCurrency"
    />
  </div>
</template>
<script setup>
import {
  addresses,
  getAddress,
  balanceTokens,
  tokenMap,
  useActiveWebStateRefs,
  useApproveToken,
  useAllTokenBalance,
  useAllTokenLaunchBridgeBalance,
  useLaunchBridgeContract,
  fromReadableAmount,
  formatNumber,
  BASE_CHAIN_ID,
  ETHEREUM_CHAIN,
  walletSwitchChain,
  getActiveLibrary,
  useActiveWebState,
  connectWallet,
  ChainId,
  Decimals,
  TokenInfo,
  ChainList,
  ChainIdList,
  useTokenAllowance,
  isAddress,
  addressFormats,
  isTronAddress,
  getERC20Contract,
  getRpcProviderByChain,
  useTronUsdtContract,
  toReadableAmount,
  isTonAddress
} from '@/web3-sdk';
import { ElMessage } from 'element-plus';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store/modules/user.js';
import searchChain from '@/components/searchChain.vue';
import borderGradient from '@/components/borderGradient.vue';
import { useCommonStore } from '@/store/modules/common.js';
import {
  transactionAddressListApi,
  contractWithdrawFeeApi,
  contractReceiveAddressApi
} from '@/api';
import { against } from '@/utils/against';
import errorIcon from '@/components/errorIcon.vue';
import BigNumber from 'bignumber.js';
import TokenWebView from '@consenlabs-fe/webview';

const { account } = useActiveWebStateRefs();

const userStore = useUserStore();
const commonStore = useCommonStore();

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const isShow = ref(true);
const ruleFormRef = ref();
const numberInputRef = ref();

const feeInfo = ref({
  withdrawMinAmount: 0,
  fee: 0,
  price: 0,
  token: 0
});

// 表单的内容
const state = reactive({
  number: null,
  symbol: '',
  address: '',
  loading: false
});

/** 自定义地址判断
 *  isBtcAddress 是否是BTC地址
 *  isTronAddress 是否是TRX地址
 *  isAddress 是否是ETH地址
 */
const addressValidator = (rule, value, callback) => {
  const symbol = userStore.withdrawCurrency.nativeCurrency.symbol;
  // 是否是BTC地址
  const regs = addressFormats[import.meta.env.VITE_BTC_ADDRESS_REG];
  let isBtcAddress = false;
  for (let reg in regs) {
    if (regs[reg].test(value)) {
      isBtcAddress = true;
      break;
    }
  }
  const isCorrectAddress = () => {
    if (value === '') return true;
    switch (symbol) {
      case 'BTC':
        return !isBtcAddress;

      case 'TRX':
        return !isTronAddress(value);

      case 'TON':
        return !isTonAddress(value);

      default:
        return !isAddress(value);
    }
  };
  /* 
  value === '' ||
    (symbol === 'BTC' && !isBtcAddress) ||
    (symbol === 'TRX' && !isTronAddress(value)) ||
    (symbol === 'TON' && !isTonAddress(value)) ||
    (symbol !== 'BTC' && symbol !== 'TRX' && symbol !== 'TON' && !isAddress(value))
  */
  console.log('isCorrectAddress', isCorrectAddress());

  if (isCorrectAddress()) {
    callback(t('Please enter the correct wallet address'));
  } else {
    callback();
  }
};
// 表单规则
const rules = computed(() => {
  return {
    number: [
      { required: true, message: t('Please enter the withdrawal amount') },
      { validator: validatenNumber, trigger: 'blur' }
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

//获取手续费
const getFee = computed(() => {
  if (!feeInfo.value.fee) {
    return 0;
  }
  if (feeInfo.value.token == state.symbol) {
    return feeInfo.value.fee;
  }
  let fee = new BigNumber(feeInfo.value.fee);
  return fee.multipliedBy(feeInfo.value.price).decimalPlaces(6);
});

const { chainId } = useActiveWebStateRefs();
const contractAddress = ref(getAddress(addresses.ChainConnect, BASE_CHAIN_ID));
const LaunchBridgeContract = useLaunchBridgeContract(contractAddress);
const { allBalance, tokenBalanceLoading, fetchHandle } = useAllTokenLaunchBridgeBalance();
const setMaxValue = () => {
  state.number = allBalance.max;
};
const symbolChange = () => {
  numberInputRef.value.resetField();
};
const changeNum = (val) => {
  if (Number(val) > Number(allBalance.max)) {
  //  state.number = Number(allBalance.max);
  }
};

const { approveHandle } = useApproveToken();
// const { library } = useActiveWebStateRefs();
const onTransition = async () => {
  if (state.loading) return;
  const token = state.symbol;
  const tokenValue = state.number;
  const userInputValue = fromReadableAmount(tokenValue, Decimals[token][BASE_CHAIN_ID]);
  const chainId = userStore.withdrawCurrency.chainOriginalId;
  const withdrawCurrencySymbol = userStore.withdrawCurrency.nativeCurrency.symbol;
  const chainConnectAddress = getAddress(addresses['ChainConnect'], chainId);

    const rpcProvider = getRpcProviderByChain(BASE_CHAIN_ID);
  const balance = await rpcProvider.getBalance(account.value);
  const num = Number(toReadableAmount(balance, 18));
  if (num === 0) {
    state.loading = false;
    ElMessage({
      message: t('symbolTips', { symbol: "Novai" }),
      type: 'error'
    });
    return;
  }
  // TODO:余额是否足够
  // let isBalanceSufficient = false;
  // const isAccordWithEth = [
  //   ChainId.ETH_MAINNET,
  //   ChainId.ETH_TESTNET,
  //   ChainId.MATIC_MAINNET,
  //   ChainId.MATIC_TESTNET,
  //   ChainId.BSC_MAINNET,
  //   ChainId.BSC_TESTNET
  // ].includes(chainId);
  // console.log('state', userStore.withdrawCurrency);
  // // 当时ETH链时判断余额是否足够
  // if (token === 'USDT' && isAccordWithEth) {
  //   const res = await getERC20Contract(
  //     getAddress(addresses[token], chainId),
  //     getRpcProviderByChain(chainId)
  //   ).balanceOf(chainConnectAddress);
  //   // console.log(toReadableAmount(res, 6), res.gte(userInputValue));
  //   isBalanceSufficient = res.gte(userInputValue);
  // } else if (token === 'USDT' && withdrawCurrencySymbol === 'TRX') {
  //   // 当在波场时余额是否足够
  //   // const isImToken = TokenWebView.isTokenEnv();
  //   // console.log('window.tronWeb', window.tronWeb, window.tron);
  //   // if (isImToken && !window.tronWeb) {
  //   //   await TokenWebView.apis.user.showAccountSwitch('TRON');
  //   //   window.location.reload();
  //   // }
  //   const res = await contractReceiveAddressApi({ chainId: chainId, token });
  //   if (res && !res.hasErrors) {
  //     const tronUsdtContract = await useTronUsdtContract({ value: chainConnectAddress })
  //       .value.balanceOf(res.data)
  //       .call();
  //     // console.log('tronUsdtContract', toReadableAmount(tronUsdtContract, 6));
  //     isBalanceSufficient = tronUsdtContract.gte(userInputValue);
  //   }
  // } else if (token === 'BTC') {
  //   // 当时BTC链时判断余额是否足够
  //   const res = await contractReceiveAddressApi({ chainId: chainId, token });
  //   if (res && !res.hasErrors) {
  //     const btcBalanceInfo = await (
  //       await fetch('https://mempool.space/testnet/api/address/' + res.data)
  //     ).json();
  //     const btcBalance =
  //       (btcBalanceInfo.chain_stats.funded_txo_sum - btcBalanceInfo.chain_stats.spent_txo_sum) /
  //       100000000;
  //     const btcBalanceAmount = fromReadableAmount(btcBalance, Decimals[token][BASE_CHAIN_ID]);
  //     // console.log('btcBalance,', btcBalanceAmount.gte(userInputValue));
  //     isBalanceSufficient = btcBalanceAmount.gte(userInputValue);
  //   }
  // }
  // console.log('isBalanceSufficient', isBalanceSufficient);
  // // 当余额不足时提示
  // if (!isBalanceSufficient) {
  //   return ElMessage({
  //     message: t('Pause extraction'),
  //     type: 'error'
  //   });
  // }
  // TODO:判断余额结束
  const approve = async (approveValue) => {
    await approveHandle(
      getAddress(addresses[token], BASE_CHAIN_ID),
      getAddress(addresses.ChainConnect, BASE_CHAIN_ID),
      approveValue,
      100000
    );
  };

  try {
    state.loading = true;
    // const toAddress = [ChainId.TRON_MAIN_NET, ChainId.TRON_TEST_NET].includes(chainId)
    //   ? state.address
    //   : account.value;
    const toAddress = state.address;

    if (token === 'USDT') {
      try {
        const contract = getERC20Contract(
          getAddress(addresses[token], BASE_CHAIN_ID),
          getRpcProviderByChain(BASE_CHAIN_ID)
        );
        // 查询当前链接钱包的用户已授权代币余额
        const allowanceRes = await contract.allowance(
          account.value,
          getAddress(addresses.ChainConnect, BASE_CHAIN_ID)
        );
        console.log('allowance res：', allowanceRes);
        // 已授权代币小于要操作的数量，并且大于0，就需要先取消授权
        // 否则就是没授权代币，直接走下面的授权就行
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
        console.error(error);
      }
    } else {
      await approve(userInputValue);
    }
    const res = await LaunchBridgeContract.value['transformAIChain'](
      userInputValue,
      toAddress,
      chainId,
      getAddress(addresses[token], BASE_CHAIN_ID)
    );
    console.log('提现', res);
    const tx = await res.wait();
    ElMessage({
      message: t('Withdrawal successful'),
      type: 'success'
    });
    symbolChange();
    fetchHandle(state.symbol);
  } catch (error) {
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
      onTransition();
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const validatenNumber = (rule, value, callback) => {
  console.log(value, 'value', feeInfo.value.withdrawMinAmount);
  if ((value || value === 0) && value < feeInfo.value.withdrawMinAmount) {
    return callback(
      new Error(t('MinWithdrawalQuantity', { min: feeInfo.value.withdrawMinAmount }))
    );
  }
  callback();
};

const getChainData = (data) => {
  userStore.withdrawCurrency = data;
};

const showPopup = ref(false);

const switchChain = () => {
  showPopup.value = true;
};

const options = ref([]);

// 获取地址列表
const addLoda = ref(true);
const getAddressList = async () => {
  if (!addLoda) return;
  addLoda.value = false;
  try {
    const res = await transactionAddressListApi({
      address: account.value,
      chainId: userStore.withdrawCurrency.chainOriginalId
    });
    if (res && !res.hasErrors) {
      let arr = [];
      res.data.forEach((item) => {
        arr.push({
          value: item,
          label: item
        });
      });
      if (arr.length !== 0) {
        options.value = arr;
        state.address = arr.value;
      }
      addLoda.value = true;
    }
  } catch (error) {
    addLoda.value = true;
  }
};

//获得提现手续费
const getContractWithdrawFeeApi = async () => {
  const chainId = userStore.withdrawCurrency.chainOriginalId;
  const token = state.symbol;
  try {
    let { data } = await contractWithdrawFeeApi({
      chainId,
      token
    });
    console.log(data, 'res', data);
    feeInfo.value = data;
    console.log(feeInfo.value, 'feeInfo.value');
  } catch (err) {}
};

watch(
  () => userStore.withdrawCurrency.chainOriginalId,
  (val) => {
    console.log(val, 'val');
    getContractWithdrawFeeApi();
  },
  {
    //immediate: true
  }
);
// 是否显示多余的内容
// const isShowMore = ref(false);
// watch(
//   () => userStore.withdrawCurrency.nativeCurrency.symbol,
//   (newSymbol) => {
//     if (!account.value) {
//       return connectWallet();
//     }
//     console.log('newWithdraw', newSymbol);
//     if (newSymbol === 'TRX' || newSymbol === 'BTC') {
//       isShowMore.value = true;
//       // getAddressList();
//     } else {
//       isShowMore.value = false;
//     }
//   },
//   {
//     immediate: true
//   }
// );
watch(
  account,
  (newAccount) => {
    console.log('newAccount', newAccount);
    state.address = newAccount;
  },
  {
    immediate: true
  }
);

// 选中的代币信息
const acSymbol = ref({});
// 选择链的代币
const symbols = ref([]);
const BtcItem = ChainList.filter((item) => item.nativeCurrency.name === 'BTC');
onMounted(() => {
  const btcId = BtcItem[0].chainOriginalId;
  symbols.value = TokenInfo[BASE_CHAIN_ID];
  state.symbol = TokenInfo[btcId][0].symbol;
  acSymbol.value = TokenInfo[btcId][0];
  findChain(TokenInfo[btcId][0].symbol);
  fetchHandle(TokenInfo[btcId][0].symbol);
  getContractWithdrawFeeApi();

  // console.log('window.tronWeb', window.ethereum, window.tronWeb, window.tron);
});

// 选择代币切换
const changeSymbol = (item) => {
  if (item.symbol === 'USDT' || item.symbol === 'BTC') {
    state.number = 0;
    findChain(item.symbol);
    acSymbol.value = item;
    state.symbol = item.symbol;
    getContractWithdrawFeeApi();
    fetchHandle(item.symbol);

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

// 更具代币查找合适的链
const findChain = (symbol) => {
  let newEthChain = {};
  for (const key in TokenInfo) {
    TokenInfo[key].forEach((item) => {
      if (item.symbol === symbol) {
        newEthChain[key] = ETHEREUM_CHAIN[key];
      }
    });
  }
  const newChainList = ChainIdList.map((item) => newEthChain[item]).filter((item) => {
    if (item) {
      return item.chainOriginalId !== BASE_CHAIN_ID;
    }
  });
  commonStore.allChainList = newChainList;
  userStore.withdrawCurrency = newChainList[0];
};
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

:deep(.el-select) {
  // width: 100px;
}

:deep(.select_address) {
  .el-select__wrapper {
    box-shadow: none !important;
    height: 66px !important;
    padding: 0 20px;

    .el-select__selected-item {
      font-size: 18px;
      color: var(--font-color13);
    }

    .el-select__suffix {
      &::before {
        content: '';
        width: 14px;
        height: 8px;
        background-image: url('@/assets/img/home/arrow.png');
        background-size: 100% 100%;
      }

      .el-icon {
        display: none;
      }
    }
  }
}

.withdrawal {
  .down_arrow {
    transform: translate(-50%, calc(-50% - 5px));
  }
  .receive_num {
    background-image: linear-gradient(180deg, #5ac27c 0%, #b2e235 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .receive_num_white {
    background-image: linear-gradient(180deg, #fff 0%, #fff 100%);
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
  .enter_address {
    :deep(.el-input__inner) {
      font-size: 13px !important;
    }
    :deep(.el-form-item__content) {
      height: 100%;
    }
  }

  :deep(.select_address) {
    .el-select__wrapper {
      box-shadow: none !important;
      height: 45px !important;
      padding: 0 20px;

      .el-select__selected-item {
        font-size: 13px;
      }
    }
  }
}

.value-wrap {
  :deep(.el-input__inner) {
    font-size: 16px;
    color: #282833;
    font-family: DINAlternate-Bold;

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
.enter_address {
  :deep(.el-input__inner) {
    font-size: 14px;
    color: #fff;
    font-family: 'OutfitMedium';
  }
  :deep(.el-input__wrapper) {
    border-radius: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.16);
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
      margin-top: 10px;
    }
  }
}
:deep(.error_tips_two) {
  .el-form-item__content {
    .el-form-item__error {
      margin-top: 4px;
    }
  }
}
</style>
