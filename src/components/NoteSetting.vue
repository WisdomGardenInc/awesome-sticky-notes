<script lang="ts" setup>
import { useConfirmDialog } from "@vueuse/core";
import { computed, ref, CSSProperties } from "vue";

const status = ref(false);
const size = ref(1);

const colorRange: string[] = [
  "#F8CDD3",
  "#F59EBA",
  "#C25493",
  "#F05568",
  "#F43993",
  "#ED4328",
  "#FCC53A",
  "#FCE029",
  "#FAF8BA",
  "#D7EE34",
  "#C6DC3D",
  "#0EC1B8",
  "#1C79C5",
  "#6498E3",
  "#BDD3EB",
];

const { isRevealed, reveal, confirm } = useConfirmDialog();

const props = defineProps<{ content: string; modelValue: CSSProperties }>();

const style = computed(() => props.modelValue);

const open = () => {
  document.querySelectorAll<HTMLInputElement>(".page").forEach((item, index) => {
    item.style.transform = `rotate(${72 + index * 12}deg)`;
  });
  status.value = true;
};

const close = () => {
  document.querySelectorAll<HTMLInputElement>(".page").forEach(function (item) {
    item.style.transform = "none";
  });
  status.value = false;
};

const changeBgColor = () => {
  return status.value ? close() : open();
};

const selectBgColor = (color: string) => {
  style.value.backgroundColor = color;
  close();
};
</script>

<template>
  <div class="i-mdi:cog cursor-pointer" @click="reveal" />
  <teleport to="body">
    <div v-if="isRevealed" class="absolute w-full h-full bg-stone-600">
      <!-- 确认区 -->
      <header class="h-10 flex justify-end items-center px-2 gap-x-1">
        <!-- <button @click="confirm">Save</button>
        <button @click="cancel">Cancel</button> -->
        <div class="i-mdi:close-circle-outline h-8 w-8 text-white" @click="confirm" />
      </header>
      <!-- 预览区 -->
      <main class="flex justify-center items-center">
        <div class="w-80 h-80 bg-yellow-200" :style="style">
          {{ props.content }}
        </div>
      </main>
      <!-- 操作区 -->
      <footer class="w-full fixed bottom-0 h-20 flex justify-center items-center gap-x-60">
        <div class="i-mdi:file w-10 h-10" :style="{ color: style.backgroundColor }" @click="changeBgColor" />
        <div class="i-mdi:format-text w-10 h-10 text-white" />
      </footer>
      <div class="box fixed bottom-0">
        <div
          v-for="(color, index) in colorRange"
          :key="index"
          class="page"
          :class="style.backgroundColor === color ? 'selected' : ''"
          :style="{ backgroundColor: color }"
          @click="selectBgColor(color)"
        />
      </div>
      <!-- <div>
        <input v-model="size" type="range" min="0.1" max="2" step="0.1" list="tickmarks" />
        <datalist id="tickmarks">
          <option value="1.1" label="特小"></option>
          <option value="1.2" label="小"></option>
          <option value="1.3" label="中"></option>
          <option value="1.4" label="大"></option>
          <option value="1.5" label="特大"></option>
        </datalist>
      </div> -->
    </div>
  </teleport>
</template>
<style lang="scss">
main {
  height: calc(100% - 7.5rem);
}
.box {
  left: calc(50% - 200px);
}
.box div {
  width: 200px;
  height: 200px;
  background-color: gainsboro;
  transform-origin: top right;
  transition: all 1s;
  position: absolute;
}

.box div.selected {
  border: 2px solid white;
}
</style>
