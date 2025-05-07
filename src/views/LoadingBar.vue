
<template>
  <div
      class="loading-bar"
      :class="{
      'w-[90%] opacity-100': isLoading,
      'w-0 opacity-0': !isLoading
    }"
  ></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(false)

const start = () => {
  isLoading.value = true
}

const finish = () => {
  isLoading.value = false
}

// Expose methods to parent component
defineExpose({
  start,
  finish
})
</script>

<style scoped>
.loading-bar {
  @apply fixed top-0 left-0 h-0.5 bg-blue-500 z-50;
  transition:
      width 0.4s,
      opacity 0.4s;
}

.loading-bar-active {
  transition: width 3s cubic-bezier(0.1, 0.5, 0.1, 1);
}
</style>