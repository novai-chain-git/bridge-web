<template>
  <div class="h48 <md:h34">
    <!-- 3 -->
    <el-tabs v-model="modelValue">
      <el-tab-pane
        v-for="(item, index) in tabsName"
        :key="index"
        :label="$t(item)"
        :name="index"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
const props = defineProps({
  tabsName: {
    type: Array,
    default: []
  }
});
// 3,双向绑定
const modelValue = defineModel({ default: 0 });
</script>

<style scoped lang="scss">
:deep(.el-tabs__item) {
  flex: 1;
  height: 48px;
  padding: 0;
  font-size: 16px;
  color: #888d98;
  border-radius: 14px;
}
:deep(.el-tabs__item.is-active) {
  transition: all 0s 0.23s;
  color: #ffffff;
}
:deep(.el-tabs__active-bar) {
  height: 48px;
  z-index: -1;
  border-radius: 10px;
  top: 6px;
  background: #4d51d2;
}
:deep(.el-tabs__nav-wrap::after) {
  display: none;
}
:deep(.el-tabs__header) {
  margin: 0;
}
:deep(.el-tabs__nav) {
  width: 100%;
  padding: 6px;
  background: #ffffff;
  border-radius: 14px;
  display: flex;
}
:deep(.el-tabs__nav-wrap) {
  overflow: visible !important;
}
:deep(.el-tabs__nav-scroll) {
  overflow: visible !important;
}
@media (max-width: 768px) {
  :deep(.el-tabs__item) {
    min-width: 80px;
    height: 34px;
    font-size: 13px;
    border-radius: 5px;
    &:nth-child(3) {
      margin: 0 20px;
    }
  }
  :deep(.el-tabs__active-bar) {
    height: 34px;
    min-width: 80px;
    border-radius: 5px;
    padding: 0 10px;
    top: 3px;
    background: linear-gradient(227deg, #19c8ff 0%, #4d8cfe 48%, #913ffb 100%);
  }
  :deep(.el-tabs__nav) {
    padding: 3px;
    border-radius: 10px;
  }
}
</style>
