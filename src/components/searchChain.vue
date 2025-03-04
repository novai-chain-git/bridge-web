<template>
  <component :is="currentComponent" v-model="showPopup">
    <div class="relative <md:hidden">
      <h1 class="line-height-28 font-['Orbitron']" text="20 c9 center">
        {{ $t('Select the main chain') }}
      </h1>
      <div class="absolute top-2 right-0 cursor-pointer" @click="showPopup = false">
        <el-icon class="font-bold" text="24!" color="#fff"><Close /></el-icon>
      </div>
    </div>
    <div
      class="w70 h5 bg-#888CA9 mxauto mb20 bdr3 hidden <md:block"
      @click="showPopup = false"
    ></div>
    <div class="mt-30 border-1 border-solid border-line1 bdr14 <md:mt0">
      <el-input
        v-model="searchVal"
        style="width: 100%; height: 60px; padding: 0 20px; color: #fff"
        :placeholder="$t('Search the web')"
      >
        <template #prefix>
          <img src="@/assets/img/home/search.svg" alt="" class="w26 mr10! <md:(w20)" />
        </template>
      </el-input>
    </div>
    <div class="curr_box max-h-460 overflow-y-auto">
      <div v-for="(item, i) in allChainList" :key="i" @click="handleClick(item)">
        <div
          class="cursor-pointer h70 bdr14 mt20 p1 <md:(h52)"
          :class="
            (item.chainId === chainData.chainId ? 'bg-to5' : 'bg-[rgba(255,255,255,0.16)]',
            { '<md:(hidden)': item.nativeCurrency.symbol === 'TON' })
          "
          hover="bg-to5"
        >
          <div
            class="h100% fyc bdr14 px20"
            :class="item.chainId === chainData.chainId ? 'bg-[#1B271D]' : 'bg-[#131315]'"
            hover="bg-[#1B271D]"
          >
            <img :src="item.icon" alt="" class="w26 h26 mr10 <md:(w20 h20)" />
            <span text="16 c9" class="font-['OutfitMedium'] <md:(text-13)">{{
              item.chainName
            }}</span>
          </div>
        </div>

        <!-- <div
          v-else
          class="cursor-pointer h70 fyc mt-20 px20 bdr14 <md:(h52)"
          border="1px solid line1"
        >
          <img :src="item.icon" alt="" class="w26 h26 mr10 <md:(w20 h20)" />
          <span text="16 c9" class="<md:(text-13)">{{ item.chainName }}</span>
        </div> -->
      </div>
    </div>
  </component>
</template>

<script setup>
import { shallowRef, ref, onMounted, onUnmounted, defineProps, computed } from 'vue';
import TempDialog from '@/components/TempDialog.vue';
import popUpMb from '@/components/popUpMb.vue';
import popUpPc from '@/components/popUpPc.vue';
import borderGradient from '@/components/borderGradient.vue';
import { useCommonStore } from '@/store/modules/common.js';
import { useI18n } from 'vue-i18n';
import errorIcon from '@/components/errorIcon.vue';
const commonStore = useCommonStore();

const { t } = useI18n();
const searchVal = ref('');
const allChainList = computed(() =>
  commonStore.allChainList.filter(
    (item) =>
      containsCharIc(item.chainName, searchVal.value) ||
      item.chainOriginalId === Number(searchVal.value)
  )
);
const showPopup = defineModel({
  type: Boolean,
  default: false
});

const props = defineProps({
  chainData: {
    type: Object,
    default: () => {}
  },
  getChainData: {
    type: Function,
    default: () => {}
  }
});

const handleClick = (item) => {
  // if (item.nativeCurrency.symbol === 'BTC')
  //   return ElMessage({
  //     message: item.chainName + ' ' + t('Coming soon'),
  //     type: 'error',
  //     customClass: 'no_usdt',
  //     icon: errorIcon
  //   });
  props.getChainData(item);
  showPopup.value = false;
};

// const searchChange = debounce((val) => {
//   const filterData = allChainList.value.filter(
//     (item) => containsCharIc(item.name, val) || item.chainId === Number(val)
//   );
//   ChainList.value = filterData;
// }, 500);

const containsCharIc = (val, name) => {
  const pattern = new RegExp(name, 'i');
  return pattern.test(val);
};

const currentComponent = shallowRef(TempDialog);

const handleResize = () => {
  const isMb = window.innerWidth < 768;
  if (isMb) {
    currentComponent.value = popUpMb;
  } else {
    currentComponent.value = popUpPc;
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped lang="scss">
:deep(.el-input__inner) {
  font-size: 16px;
  color: var(--font-color9);
  font-family: 'OutfitMedium';
}
:deep(.el-input__wrapper) {
  background-color: transparent;
  border: none;
  box-shadow: none;
}
.curr_box {
  &::-webkit-scrollbar {
    width: 0px;
  }
}
@media (max-width: 768px) {
  :deep(.el-input) {
    height: 45px !important;
    border-radius: 10px;
    .el-input__wrapper {
      padding: 0;
      .el-input__inner {
        font-size: 13px;
      }
    }
  }
}
</style>
