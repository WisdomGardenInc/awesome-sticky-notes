<script setup lang="ts">
import { useKeyModifier } from '@vueuse/core';
import { computed } from 'vue';
import { nextTick, ref } from 'vue'
import { Note } from '../types';

const props = defineProps<{ modelValue: Note }>()
const emit = defineEmits(['update:modelValue', 'delete'])

const titleInput = ref<HTMLElement|null>(null);


const note = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const startEditingTitle = async ():Promise<void> => {
  note.value.editMode = true;
  await nextTick();
  titleInput.value!.focus();
}

const getHtml = (note: Note) => {
  return note.content.replaceAll('<', '&lt;').replace(/(https?:\/\/[^\s'"]+)/g, "<a target='_blank' href='$1'>$1</a>")
}

const meta = useKeyModifier('Meta')
const shift = useKeyModifier('Shift')
const keyPressed = computed(()=> meta.value && shift.value)
</script>

<template>
  <div class="header w-full bg-light-800 flex justify-between items-center p-1">
    <div
      class="drag flex-1 text-left select-none overflow-hidden text-ellipsis"
      @dblclick="startEditingTitle"
    >
      <input
        v-show="note.editMode"
        ref="titleInput"
        v-model="note.title"
        class="w-full"
        @blur="note.editMode = false"
        @keydown.enter="note.editMode = false"
      >
      <span
        v-show="!note.editMode"
        class="drag"
      >{{ note.title }}</span>
    </div>
    <div
      class="i-mdi:close cursor-pointer delete-note"
      @click="emit('delete', note)"
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
</template>

<style scoped lang="scss">
.header {
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
</style>
