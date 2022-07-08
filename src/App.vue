<script setup lang="ts">
import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core'

//@ts-ignore
import VueDragResize from 'vue-drag-resize-2'

interface Position {
  left: Number, //the X position of the component
  top: Number, //the Y position of the component
  width: Number, //the width of the component
  height: Number //the height of the component
}

class Note {
  public content = ''
  public ts = 0;
  public position: Position = { left: 50, top: 50, width: 200, height: 200 }
  constructor() {
    this.ts = new Date().getTime()
  }
}

const notes = ref<Note[]>([new Note()])

const newNote = () => {
  notes.value.push(new Note())
}

const onDragstop = (position: Position, note: Note) => {
  note.position = position
}

useLocalStorage('notes', notes)

</script>

<template>
  <button @click="newNote">+</button>
  <VueDragResize v-for="note in notes" :key="note.ts" 
    :x="note.position.left" :y="note.position.top"
    :w="note.position.width" :h="note.position.height"
    @dragstop="onDragstop($event, note)"
    @resizestop="onDragstop($event, note)"
    dragHandle=".drag" class="bg-yellow-200">
    <div class="drag w-full h-4 bg-light-800"></div>
    <textarea class="w-full h-full" v-model="note.content"></textarea>
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

textarea {
  box-sizing: border-box;
  border: none;
  background: transparent;
  resize: none;
}

:deep(.content-container) {
  display: flex;
  flex-direction: column;
}
</style>
