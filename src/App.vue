<template>
  <el-config-provider :locale="locale" :size="assemblySize" :button="buttonConfig">
    <Header></Header>
    <router-view v-slot="{ Component }">
      <keep-alive :include="configInfoData.includeList">
        <component class="view-wrap" :key="$route.fullPath" :is="Component" />
      </keep-alive>
    </router-view>
    <Footer></Footer>
  </el-config-provider>
</template>
<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const configInfoData = {
  noNavPageNames: ['layout', 'detailsPage', 'evaluate', 'resources'],
  includeList: []
};
import { useI18n } from 'vue-i18n';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { getBrowserLang } from '@/utils/index.js';
// init language
const i18n = useI18n();
const globalStore = useGlobalStore();
i18n.locale.value = globalStore.language;

// element language
const locale = computed(() => {
  console.log('语言改变');
  if (globalStore.language == 'zh') return zhCn;
  if (globalStore.language == 'en') return en;
  return getBrowserLang() == 'zh' ? zhCn : en;
});

// element assemblySize
const assemblySize = computed(() => globalStore.assemblySize);

// element button config
const buttonConfig = reactive({ autoInsertSpace: false });
</script>

<style lang="scss">
@font-face {
  font-family: 'Orbitron';
  src: url('./assets/font/orbitron/orbitron-black.ttf') format('truetype');
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: 'OrbitronBold';
  src: url('./assets/font/orbitron/orbitron-bold.otf') format('opentype');
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: 'OrbitronMedium';
  src: url('./assets/font/orbitron/orbitron-medium.ttf') format('truetype');
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: 'Poppins';
  src: url('./assets/font/poppins/Poppins-Regular.ttf') format('truetype');
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: 'OutfitMedium';
  src: url('./assets/font/outfit/Outfit-Medium.ttf') format('truetype');
  font-style: normal;
  font-weight: normal;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@media (max-width: 768px) {
  .el-button--primary:hover {
    -webkit-tap-highlight-color: rgba(0 0 0 / 0);
    background-color: rgb(77 81 210 / var(--un-bg-opacity));
  }
  .el-button--primary:active {
    -webkit-tap-highlight-color: rgba(0 0 0 / 0);
    color: var(--el-button-hover-text-color);
    border-color: var(--el-button-hover-border-color);
    background-color: var(--el-button-hover-bg-color);
    outline: none;
  }
}

body {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  color: #1a1a1a;
  background: var(--bg11);
}

#app {
  // font-family: microsoft yahei, Avenir, Helvetica, Arial, sans-serif;
  font-family: 'OutfitMedium', Pingfang, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

p {
  margin: 0;
}

ul,
li {
  list-style: none;
}

#app,
.view-wrap {
  box-sizing: border-box;
  min-height: 100vh;
}

img {
  display: block;
}

a {
  text-decoration: none;
  color: var(--font-color4);
}

:root:root {
  --bg1: #181a20;
  --bg2: #ffffff;
  --bg3: #e4e9f4;
  --bg4: rgba(226, 222, 222, 0.22);
  --bg5: rgba(79, 115, 163, 0.04);
  --bg6: #1b1b23;
  --bg7: #282833;
  --bg8: #f5f5fb;
  --bg9: rgba(67, 82, 212, 0.03);
  --bg10: rgb(237, 238, 242);
  --bg11: #000a03;
  --bg12: #000000;
  --primary-color0: #f4f7fc;
  --van-primary-color: #4f73a3;
  --primary-color2: #354c70;
  --font-color2: #354c70;
  --font-color3: #222;
  --font-color4: #000;
  --font-color5: #999;
  --font-color6: #12c987;
  --font-color7: #697b8d;
  --font-color8: #888888;
  --font-color9: #ffffff;
  --font-color10: #00bfff;
  --font-color11: #eb892e;
  --font-color12: #4d51d2;
  --font-color13: #282833;
  --font-color14: rgba(255, 255, 255, 0.54);
  --font-color15: #131315;
  --border-color: #e2dede;
  --border-color1: rgba(255, 255, 255, 0.16);
}

/* button {
  --el-button-hover-bg-color: #354C70 !important;
  --el-button-hover-border-color: #354C70 !important;
  --el-button-active-bg-color: #354C70 !important;
  --el-button-active-border-color: #354C70 !important;
} */

// 需要页面底部加 padding 页面。有一个元素 class 为 .pbh
.view-wrap:has(.bottom-wrap) {
  padding-bottom: 180px;
}

body {
  &::-webkit-scrollbar {
    width: 0;
  }
}

// 渐变边框
// .border_gradient {
//   background: linear-gradient(227deg, #19c8ff 0%, #4d8cfe 48%, #913ffb 100%);
//   position: relative;
//   &::after {
//     content: '';
//     inset: 1px;
//     position: absolute;
//     background: var(--bg6);
//     border-radius: 14px;
//     z-index: 0;
//   }
// }

.no_usdt {
  top: 50% !important;
  transform: translate(-50%, -100%);
}

// 取消弹窗弹出会有个滚动条宽度
.el-popup-parent--hidden {
  width: 100% !important;
}

.temp_dialog {
  border-radius: 14px !important;
  padding: 1px !important;
  background: linear-gradient(180deg, #5ac27c 0%, #b2e235 100%) !important;
  .el-dialog__header {
    padding-bottom: 0;
  }
}
</style>
