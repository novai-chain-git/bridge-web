<template>
  <TempDialog v-model="modelValue" :width="520" :isFooter="false">
    <slot></slot>
  </TempDialog>
</template>

<script setup>
const modelValue = defineModel({
  type: Boolean,
  default: false
});
</script>

<style scoped lang="scss"></style>
