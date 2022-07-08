<script setup lang="ts">
import VueDragResize from 'vue-drag-resize-2'
</script>

<template>
  <VueDragResize  dragHandle=".drag">
    <div class="drag w-full h-4 bg-light-800" ></div>
    <textarea name="" id="" class="w-full h-full"></textarea>
  </VueDragResize>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

:deep(.content-container) {
  display: flex;
  flex-direction: column;
}
:deep(.content-box) {
  box-sizing: border-box;
}
</style>
