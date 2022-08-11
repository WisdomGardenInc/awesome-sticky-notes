<script setup lang="ts">
import { ref, watch } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useKeyModifier } from '@vueuse/core'
//@ts-expect-error no type
import VueDragResize from "vue-drag-resize-2";
import { computed } from "vue";

interface Position {
  left: number; //the X position of the component
  top: number; //the Y position of the component
  width: number; //the width of the component
  height: number; //the height of the component
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

const getHtml = (note: Note) => {
  return note.content.replace('<', '&lt;').replace(/(https?:\/\/\S+)/g, "<a target='_blank' href='$1'>$1</a>")
}


const meta = useKeyModifier('Meta')
const shift = useKeyModifier('Shift')
const keyPressed = computed(()=> meta.value && shift.value)

const textarea = ref<HTMLElement[]>([]);
const htmlContainer = ref<HTMLElement[]>([]);

</script>

<template>
  <div
    class="bg"
    @dblclick.self="newNoteWithPosition($event)"
  >
    <VueDragResize
      v-for="note in notes"
      :key="note.ts"
      :x="note.position.left"
      :y="note.position.top"
      :w="note.position.width"
      :h="note.position.height"
      drag-handle=".drag"
      class="bg-yellow-200 border border-amber"
      @dragstop="onDragstop($event, note)"
      @resizestop="onDragstop($event, note)"
      @mousedown="changeIndex(note)"
    >
      <div
        class="drag w-full bg-light-800 flex justify-between p-1"
      >
        <div class="" />
        <div
          class="i-mdi:close cursor-pointer delete-note"
          @click="deleteNote(note)"
        />
      </div>
      <div
        v-show="keyPressed"
        ref="htmlContainer"
        class="htmlContainer"
        v-html="getHtml(note)"
      />
      <textarea
        v-show="!keyPressed"
        ref="textarea"
        v-model="note.content"
        class="w-full h-full"
      />
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

.htmlContainer {
  text-align: left;
  white-space: pre-wrap;
  line-height: 1;
  font-size: 14px;
  word-break: break-word;
  width: 100%;
  font-weight: 400;
  overflow-y: auto;
  padding: 2px;
  color: #000;
}

textarea {
  border: none;
  background: transparent;
  resize: none;
  line-height: 1;
  font-size: 14px;
  font-weight: 400;
  white-space: pre-wrap;
  font-family: inherit;
  color: #000;
}

:deep(.content-container) {
  display: flex;
  flex-direction: column;
}
</style>
