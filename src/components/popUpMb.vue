<template>
  <el-drawer
    v-model="modelValue"
    direction="btt"
    :show-close="false"
    :with-header="false"
    size="auto"
    lock-scroll
    :append-to-body="true"
    class="bg-[#131315]! md_drawer font-['OutfitMedium']"
    style="border-top-left-radius: 10px; border-top-right-radius: 10px"
  >
    <slot></slot>
  </el-drawer>
</template>

<script setup>
const modelValue = defineModel({
  type: Boolean,
  default: false
});
</script>

<style scoped lang="scss">
:deep(.el-drawer__body) {
  .popup_height {
    display: none;
  }
}
// .el-drawer__body
</style>
