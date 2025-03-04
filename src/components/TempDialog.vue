<template>
  <el-dialog
    v-model="modelValue"
    :width="width"
    v-bind="$attrs"
    :show-close="false"
    :align-center="true"
    lock-scroll
    :append-to-body="true"
    class="temp_dialog"
  >
    <template v-if="isHeader" #header>
      <div>
        <h4 class="m0" text="18 c13">
          <slot name="title">{{ title }}</slot>
        </h4>
      </div>
    </template>
    <div text="c13" class="p30 bdr-14 bg-[#131315]">
      <slot></slot>
    </div>
    <template v-if="isFooter" #footer>
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button type="primary" @click="confirm">Buy</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
/**
 * modelValue  是否显示弹窗
 * title 标题，不传不显示
 * isHeader 是否显示头部（标题，关闭按钮）
 * width 弹窗宽度
 * close 关闭弹窗方法
 */
const modelValue = defineModel({
  type: Boolean,
  default: false
});
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  isHeader: {
    type: Boolean,
    default: true
  },
  isFooter: {
    type: Boolean,
    default: true
  },
  width: {
    type: Number,
    default: 360
  },
  confirm: {
    type: Function,
    default: () => {}
  }
});
const closeDialog = () => {
  modelValue.value = false;
};
</script>

<style scoped lang="scss">
:deep(.el-dialog) {
  padding: 1px;
  border-radius: 14px;
  background: linear-gradient(180deg, #5ac27c 0%, #b2e235 100%);
}

:deep(.el-dialog__footer) {
  margin-top: 10px;
}
:deep(.el-button) {
  border: 1px solid var(--br1);
  width: 120px;
  height: 44px;
  line-height: 44px;
  background: var(--bg3) !important;
  border-radius: 22px;
  color: var(--c13);
  font-size: 16px;
  margin-right: 20px;
  &:hover {
    color: var(--c9);
    border: 1px solid var(--br1);
  }
}
:deep(.el-button--primary) {
  margin-right: 0;
  border: none;
  background: linear-gradient(90deg, #afc540 0%, #15b477 100%) !important;
  &:hover {
    border: none;
  }
}
:deep(.el-overlay) {
  background: rgba(0, 0, 0, 0.7);
}
</style>
