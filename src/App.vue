<script setup lang="ts">
import VueDragResize from 'vue-drag-resize'
</script>

<template>
  <VueDragResize :isActive="true" dragHandle=".drag">
    <button class="drag">title</button>
    <div>test</div>
  </VueDragResize>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
