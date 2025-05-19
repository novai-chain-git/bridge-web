<template>
  <div
    class="w100% h74 px23 absolute backdrop-blur-10px top-0 left-0 fyc z-100 <md:(h54 px15)"
    position="fixed top-0 left-0"
  >
    <a href="https://www.novaichain.com/#/">
      <img src="@/assets/img/home/logo_dark.svg" alt="" class="h42 <md:(wauto h29)" />
    </a>
    <!-- <div
      class="px20 h50 bdr14 shadow2 mrauto cursor-pointer text-18 <md:(text-14 h30 bdr-15 px10)"
      flex="~ justify-between items-center"
      @click="router.go(-1)"
    >
      <img src="@/assets/img/home/back.png" class="w30 h30 <md:(w20 h20)" alt="" />
    </div> -->
    <!-- 切换语言 -->
    <div
      class="h100% relative mlauto mr40 fyc <md:(mr10 static)"
      @mouseenter="isShowLang = true"
      @mouseleave="isShowLang = false"
    >
      <img
        src="@/assets/svg/icon4.svg"
        alt=""
        class="w20 h20 <md:(w16 h16)"
        @click="isShowLang = true"
      />

      <div
        class="lang_list bg-to5 p1 bdr-10 z-10 shadow4 w120"
        :class="[isShowLang ? 'dropdown_item' : 'dropdown_items']"
      >
        <ul class="bdr-10 bg-[#131315] py10">
          <li
            v-for="(lang, index) in langList"
            :key="index"
            class="h40 px20 fyc cursor-pointer <md:(px10 text-13)"
            text="14 c9"
            :class="{ '': lang.value === language.value }"
            @click="setLang(lang.value)"
          >
            {{ lang.name }}
            <img
              v-if="lang.value === language.value"
              src="@/assets/img/home/choose.svg"
              alt=""
              class="mlauto w12"
            />
          </li>
        </ul>
      </div>
    </div>
    <!-- <el-dropdown @command="setLang">
      <span
        class="px16 h50 bdr14 shadow3 bg-[#F3EFEE] mr30 fyc font-bold cursor-pointer border-none outline-none <md:(px20 h30 text-12 bdr-15 mr10 font-normal)"
        text="16 c11"
      >
        {{ language.alias }}
        <el-icon class="ml10">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(lang, index) in langList"
            :key="index"
            :command="lang.value"
            class="px30 <md:(px15)"
            :disabled="lang.value === language.value"
            >{{ lang.alias }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown> -->
    <!-- 链接钱包 -->
    <div v-if="shortAccount" class="h100% fyc h36 bg-to5 bdr8 p1">
      <div class="fyc bdr8 h34 bg-bg1 px15" text="14 c9">
        <div class="<md:hidden" v-if="commonStore.novaiBalance">
          {{ commonStore.novaiBalance }} NOV
        </div>
        <div
          class="w0 h0 ml16 <md:(hidden)"
          border="5 solid transparent"
          border-t="#959698"
          border-b="none"
          v-if="commonStore.novaiBalance"
        ></div>
        <div class="w1 h18 bg-[#959698] mx16 <md:(hidden)" v-if="commonStore.novaiBalance"></div>
        <div
          class="h100% fyc cursor-pointer relative"
          @mouseenter="isShowQuit = true"
          @mouseleave="isShowQuit = false"
        >
          <div class="h100% fyc">
            <span class="line-height-17" border-b="1 solid #fff">{{ against(account) }}</span>
            <div v-html="iconDom" class="ml10 w16 h16"></div>
          </div>
          <div
            class="dropdown_quit_box p1 bg-to5 h40 bdr10 mt14 cursor-pointer"
            :class="[isShowQuit ? 'dropdown_quit' : 'dropdown_quits']"
            @click="accountMenu('Disconnect')"
          >
            <div class="px16 fyc bg-[#131315] h100% bdr10 <md:(text-13 px10 )" text="14 c4">
              <img src="@/assets/img/home/quit.png" alt="" class="h15" />
              <p class="whitespace-nowrap ml4 mr8 text-16 text-[#FFF]">
                {{ $t('Disconnect') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img
      v-else
      @click="connectWalletHandle"
      src="@/assets/svg/wallet.svg"
      alt=""
      class="w20 h20 cursor-pointer <md:(w16 h16)"
    />
  </div>
</template>

<script setup>
import {
  connectWallet,
  useActiveWebStateRefs,
  disconnectWallet,
  getActiveLibrary,
  Decimals,
  toReadableAmount,
  BASE_CHAIN_ID,
  getRpcProviderByChain,
  useActiveWebState
} from '@/web3-sdk';
import { useCommonStore } from '@/store/modules/common.js';
import { langList } from '@/lang/index.js';
import { useI18n } from 'vue-i18n';
import Jazzicon from 'jazzicon';
import { watch, ref, onMounted } from 'vue';
import BigNumber from 'bignumber.js';
import lodash from 'lodash-es';
import tp from 'tp-js-sdk';

const { shortAccount, account } = useActiveWebStateRefs();
const commonStore = useCommonStore();
const userStore = useUserStore();
const globalStore = useGlobalStore();
const i18n = useI18n();
const route = useRoute();
const isBack = !!route.query.source;
const router = useRouter();

const language = computed(
  () => langList.find((d) => d.value === globalStore.language) ?? langList[0]
);

const iconDom = ref('');
const setLang = (lang) => {
  i18n.locale.value = lang;
  globalStore.setGlobalState('language', lang);
  isShowLang.value = false;
  switchPageTitleAndDesc(lang);
};

const connectWalletHandle = async () => {
  const { setAccount } = useActiveWebState();
  const isTp = tp.isConnected();
  if (isTp) {
    const wallet = await tp.getWallet({ walletTypes: ['eth'] });
    setAccount(wallet.data.address);
  } else {
    await connectWallet();
  }
};

const accountMenu = (val) => {
  switch (val) {
    case 'Disconnect':
      disconnectWallet();
      userStore.logout();
      window.location.reload();
      break;

    default:
      break;
  }
};

const isShowLang = ref(false);

const isShowQuit = ref(false);

const against = (t) => {
  if (!t) return '';
  if (t.length <= 10) {
    return t;
  }
  return t.substring(0, 6) + '...' + t.substring(t.length - 4, t.length);
};
watch(
  () => account.value,
  async (newAccount) => {
    console.log(BASE_CHAIN_ID,'BASE_CHAIN_ID')
    const rpcProvider = getRpcProviderByChain(BASE_CHAIN_ID);
    const balance = await rpcProvider.getBalance(newAccount);
    // const num = Number(toReadableAmount(balance, Decimals.USDT[BASE_CHAIN_ID])).toFixed(
    //   6,
    //   BigNumber.ROUND_DOWN
    // );
    console.log('balance', balance);

    const num = Number(toReadableAmount(balance, 18)).toFixed(4);

    commonStore.setNovaiBalance(num);
    if (newAccount) {
      iconDom.value = Jazzicon(16, parseInt(newAccount.slice(2, 10), 16)).outerHTML;
    }
  },
  {
    immediate: true
  }
);

onMounted(() => {
  switchPageTitleAndDesc(globalStore.language);
});

const switchPageTitleAndDesc = (acLang) => {
  switch (acLang) {
    case 'zh':
      document.querySelector('#swap-page-title').innerText =
        'Novai Bridge：提升资产流动性的跨链解决方案';
      document.querySelector('#swap-desc-meta').content =
        'Novai Bridge 促进无缝的跨链资产转移，提升主要区块链网络（如比特币和以太坊）之间的流动性和互操作性。';
      break;
    default:
      document.querySelector('#swap-page-title').innerText =
        'Novai Bridge: Cross-Chain Solutions for Enhanced Asset Liquidity';
      document.querySelector('#swap-desc-meta').content =
        'Novai Bridge facilitates seamless cross-chain asset transfers, enhancing liquidity and interoperability across major blockchain networks like Bitcoin and Ethereum.';
      break;
  }
};
</script>

<style scoped lang="scss">
.lang_list {
  position: absolute;
  top: 60px;
  left: 50%;
  transition: all 0.3s;
}
.dropdown_item {
  transform: translateX(-50%) scale(1);
}
.dropdown_items {
  transform: translateX(-50%) scale(0);
}
.dropdown_quit_box {
  position: absolute;
  top: 20px;
  left: 50%;
  transition: all 0.3s;
}
.dropdown_quit {
  transform: translateX(-50%) scale(1);
}
.dropdown_quits {
  transform: translateX(-50%) scale(0);
}
@media (max-width: 768px) {
  .lang_list {
    top: 45px;
    left: auto;
    right: 15px;
  }
  .dropdown_item {
    transform: translateX(0) scale(1);
  }
  .dropdown_items {
    transform: translateX(0) scale(0);
  }
  .dropdown_quit {
    transform: translateX(0) scale(1);
  }
  .dropdown_quits {
    transform: translateX(0) scale(0);
  }
  .dropdown_quit_box {
    position: absolute;
    top: 20px;
    left: 0;
    transition: all 0.3s;
  }
}
</style>
