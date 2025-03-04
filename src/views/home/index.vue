<template>
  <div @touchstart="" class="home min-h100vh bg-bg11 pb50 <md:()" text="c9">
    <div class="w100% min-h100vh relative pt74 <md:(pt54)">
      <div class="w100% h100% z-1 fcc" position="absolute">
        <video
          class="h100% w100% object-cover <md:hidden"
          src="@/assets/video/homebg.mp4"
          :autoplay="width"
          loop
          muted
          webkit-playsinline
          playsinline
        ></video>
        <img
          class="h100% w100% object-cover hidden <md:block"
          src="@/assets/img/home/homebg.gif"
          alt=""
        />
      </div>
      <div class="fxc z2 mt20 <md:mt30" position="relative">
        <div text="50 c4" class="home_title font-700 capitalize <md:text-20">
          {{ $t('Access your USDT') }}
        </div>
        <div class="w458 mxauto mt20 bg-to5 bdr-16 p1 <md:(w345)">
          <div class="w100% bg-[#0f1111] bdr-16 px16 <md:px15">
            <!-- <Tabs v-model="globalStore.tabNum" :tabsName="['deposit', 'Withdrawal', 'record']">
          </Tabs> -->
            <div class="w100% fyc justify-between h70 <md:h50">
              <div
                v-for="item in tab"
                :key="item.name"
                class="h100%"
                :class="{ 'flex-1 fcc': item.name !== 'record' }"
              >
                <div
                  v-if="item.name !== 'record'"
                  class="h100% relative cursor-pointer"
                  @click="tabClick(item)"
                >
                  <div class="w100% h100% fyc pt10">
                    <img
                      :src="item.name === acTab.name ? item.acIcon : item.icon"
                      alt=""
                      class="mr4 <md:w16"
                    />
                    <span
                      class="text-16 <md:text-14"
                      :class="item.name === acTab.name ? 'text-c9' : 'text-c14'"
                    >
                      {{ $t(item.label) }}
                    </span>
                  </div>
                  <div
                    class="inline-block w100% h2 bg-[transparent]"
                    :class="item.name === acTab.name && 'bg-to5'"
                    position="absolute left-0 bottom-0"
                  ></div>
                </div>
                <div v-else class="h100% fcc relative cursor-pointer pt10 ml16" @click="tabClick(item)">
                  <img
                    :src="item.name === acTab.name ? item.acIcon : item.icon"
                    alt=""
                    class="<md:w16"
                  />
                  <div
                    class="inline-block w100% h2 bg-[transparent]"
                    :class="item.name === acTab.name && 'bg-to5'"
                    position="absolute left-0 bottom-0"
                  ></div>
                </div>
              </div>
            </div>

            <div class="w100% box-border">
              <!--存款  -->
              <Deposit v-if="acTab.name === 'deposit'"></Deposit>
              <!-- 提现 -->
              <Withdrawal v-if="acTab.name === 'withdrawal'"></Withdrawal>
              <!-- 记录 -->
              <Record v-if="acTab.name === 'record'"></Record>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Tabs from '@/components/Tabs.vue';
import Deposit from '@/views/home/components/deposit.vue';
import Withdrawal from '@/views/home/components/withdrawal.vue';
import Record from '@/views/home/components/record.vue';
import { useI18n } from 'vue-i18n';

import dep from '@/assets/home/tab/dep.svg';
import acdep from '@/assets/home/tab/acdep.svg';
import withicon from '@/assets/home/tab/with.svg';
import acwithicon from '@/assets/home/tab/acwith.svg';
import reeord from '@/assets/home/tab/record.svg';
import acrecord from '@/assets/home/tab/acrecord.svg';

const globalStore = useGlobalStore();
const { t } = useI18n();
const tab = [
  {
    name: 'deposit',
    label: 'deposit',
    icon: dep,
    acIcon: acdep
  },
  {
    name: 'withdrawal',
    label: 'Withdrawal',
    icon: withicon,
    acIcon: acwithicon
  },
  {
    name: 'record',
    label: 'record',
    icon: reeord,
    acIcon: acrecord
  }
];

const width = ref(window.innerWidth >= 768 ? true : false);

const acTab = ref(globalStore.tabItem.name ? globalStore.tabItem : tab[0]);

const tabClick = (item) => {
  acTab.value = item;
  globalStore.setTabItem(item);
};
</script>

<style scoped lang="scss">
.home {
  .home_title {
    background-image: linear-gradient(180deg, #5ac27c 0%, #b2e235 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}
</style>
