<script lang="ts" setup>
import { useConfirmDialog } from "@vueuse/core";
import { computed, ref, CSSProperties } from "vue";

const status = ref(false);
const size = ref(1);

const colorRange = ["red", "orange", "yellow", "green", "blue", "cyan", "fuchsia", "purple", "gray", "gainsboro"];

const { isRevealed, reveal, confirm, cancel } = useConfirmDialog();

const props = defineProps<{ content: string; modelValue: CSSProperties }>();

const style = computed(() => props.modelValue);

const open = () => {
  Array.from(document.getElementsByClassName("page")).forEach(function (item) {
    item.classList.add("rotate");
  });
  status.value = true;
};

const close = () => {
  Array.from(document.getElementsByClassName("page")).forEach(function (item) {
    item.classList.remove("rotate");
  });
  status.value = false;
};

const changeBgColor = () => {
  return status.value ? close() : open();
};

const selectBgColor = (index: number) => {
  console.log(index);
  style.value.backgroundColor = colorRange[index - 1];
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
        <div class="i-mdi:close-circle-outline h-8 w-8 text-white" @click="confirm"></div>
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
          v-for="index in 10"
          :key="index"
          class="page"
          :class="style.backgroundColor === colorRange[index - 1] ? 'selected' : ''"
          @click="selectBgColor(index)"
        >
          {{ index }}
        </div>
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

.box div.rotate:nth-child(1) {
  background: red;
  transform: rotate(72deg);
}

.box div.rotate:nth-child(2) {
  background: orange;
  transform: rotate(90deg);
}

.box div.rotate:nth-child(3) {
  background: yellow;
  transform: rotate(108deg);
}

.box div.rotate:nth-child(4) {
  background: green;
  transform: rotate(126deg);
}

.box div.rotate:nth-child(5) {
  background: blue;
  transform: rotate(144deg);
}

.box div.rotate:nth-child(6) {
  background: cyan;
  transform: rotate(162deg);
}

.box div.rotate:nth-child(7) {
  background: fuchsia;
  transform: rotate(180deg);
}

.box div.rotate:nth-child(8) {
  background: purple;
  transform: rotate(198deg);
}

.box div.rotate:nth-child(9) {
  background: gray;
  transform: rotate(216deg);
}

.box div.rotate:nth-child(10) {
  background: gainsboro;
  transform: rotate(234deg);
}

.box div.selected {
  border: 2px solid white;
}
</style>
