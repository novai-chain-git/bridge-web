<template>
  <div class="border-gradient" :class="class">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  class: {
    type: String,
    default: ''
  }
});
</script>

<style scoped lang="scss">
.border-gradient {
  background: linear-gradient(227deg, #19c8ff 0%, #4d8cfe 48%, #913ffb 100%);
  border-radius: 14px;
  padding: 1px;
  .content {
    background: var(--bg6);
    position: relative;
    z-index: 1;
    border-radius: 14px;
  }
}
</style>
