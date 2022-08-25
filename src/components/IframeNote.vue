<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { nextTick, ref } from 'vue'
import { Note } from '../types';

const props = defineProps<{ modelValue: Note }>()
const emit = defineEmits(['update:modelValue', 'delete'])

const titleInput = ref<HTMLElement | null>(null);

const note = computed(() => props.modelValue);

const startEditingTitle = async (): Promise<void> => {
  note.value.editMode = true;
  await nextTick();
  titleInput.value!.focus();
}
const viewMode = ref(true);

const switchMode = ()=> {
  viewMode.value = !viewMode.value
}
</script>

<template>
  <div class="header w-full bg-light-800 flex justify-between items-center px-1">
    <div
      class="drag flex-1 text-left select-none overflow-hidden text-ellipsis h-full py-1"
      @dblclick="startEditingTitle"
    >
      <input
        v-if="note.editMode"
        ref="titleInput"
        v-model="note.title"
        class="w-full min-h-5"
        @blur="note.editMode = false"
        @keydown.enter="note.editMode = false"
      >
      <div
        v-else
        class="pointer-events-none min-h-5"
      >
        {{ note.title }}
      </div>
    </div>
    <div
      class="i-mdi:cog-outline"
      @click="switchMode"
    />
    <div
      class="i-mdi:close cursor-pointer delete-note"
      @click="emit('delete', note)"
    />
  </div>
  <div class="iframe">
    <iframe
      v-if="viewMode"
      :src="note.content"
      frameborder="0"
    />
    <div v-else>
      <label for="">
        url
      </label>
      <input
        v-model="note.content"
        type="text"
        class="w-full"
        @keydown.enter="switchMode"
      >
    </div>
  </div>
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

.iframe {
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
