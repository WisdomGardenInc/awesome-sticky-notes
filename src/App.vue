<script setup lang="ts">
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

//@ts-ignore
import VueDragResize from "vue-drag-resize-2";

interface Position {
  left: Number; //the X position of the component
  top: Number; //the Y position of the component
  width: Number; //the width of the component
  height: Number; //the height of the component
}

class Note {
  public content = "";
  public ts = 0;
  public position: Position = { left: 50, top: 50, width: 200, height: 200 };
  constructor() {
    this.ts = new Date().getTime();
  }
}

const notes = ref<Note[]>([new Note()]);

const deleteNote = (note: Note) => {
  let noteIndex = notes.value.indexOf(note);
  notes.value.splice(noteIndex, 1);
};

const onDragstop = (position: Position, note: Note) => {
  note.position = position;
};

const newNoteWithPosition = (e: MouseEvent) => {
  let note = new Note()
  note.position = { left: e.x, top: e.y, width: 200, height: 200 }
  notes.value.push(note);
}

useLocalStorage('notes', notes)

const changeIndex = (note: Note) => {
  deleteNote(note)
  notes.value.push(note)
};

useLocalStorage("notes", notes);
</script>

<template>
  <div class="bg" @dblclick.self="newNoteWithPosition($event)">
    <VueDragResize v-for="note in notes" :key="note.ts" :x="note.position.left" :y="note.position.top"
      :w="note.position.width" :h="note.position.height" @dragstop="onDragstop($event, note)"
      @resizestop="onDragstop($event, note)" @mousedown="changeIndex(note)" dragHandle=".drag"
      class="bg-yellow-200 border border-amber">
      <div class="drag w-full bg-light-800 flex justify-between p-1">
        <div class=""></div>
        <div class="i-mdi:close cursor-pointer delete-note" @click="deleteNote(note)"></div>
      </div>
      <textarea class="w-full h-full" v-model="note.content"></textarea>
    </VueDragResize>
  </div>
</template>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}

.bg {
  height: 100%;
}

.drag {
  .delete-note {
    visibility: hidden;
  }

  &:hover {
    .delete-note {
      visibility: visible;
    }
  }
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
