<script setup lang="ts">
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
//@ts-expect-error no type
import VueDragResize from "vue-drag-resize-2";
import TextNote from "./components/TextNote.vue"
import { Note, Position } from "./types";
import { useIntro } from "./hooks/useIntro";

const notes = ref<Note[]>([new Note()]);

const deleteNote = (note: Note) => {
  const noteIndex = notes.value.indexOf(note);
  notes.value.splice(noteIndex, 1);
};

const onDragstop = (position: Position, note: Note) => {
  note.position = position;
};

const newNoteWithPosition = (e: MouseEvent) => {
  const note = new Note()
  note.position = { left: e.x, top: e.y, width: 200, height: 200 }
  notes.value.push(note);
}


const changeIndex = (note: Note) => {
  deleteNote(note)
  notes.value.push(note)
};

useLocalStorage("notes", notes);

useIntro()
</script>

<template>
  <div
    class="bg"
    @dblclick.self="newNoteWithPosition($event)"
  >
    <VueDragResize
      v-for="(note, index) in notes"
      :key="note.ts"
      :x="note.position.left"
      :y="note.position.top"
      :w="note.position.width"
      :h="note.position.height"
      drag-handle=".drag"
      class="bg-yellow-200 border border-amber note"
      @dragstop="onDragstop($event, note)"
      @resizestop="onDragstop($event, note)"
      @mousedown="changeIndex(note)"
    >
      <TextNote
        v-model="notes[index]"
        @delete="deleteNote(notes[index])"
      />
    </VueDragResize>
  </div>
</template>

<style scoped lang="scss">
.bg {
  height: 100%;
}

:deep(.content-container) {
  display: flex;
  flex-direction: column;
}

</style>
