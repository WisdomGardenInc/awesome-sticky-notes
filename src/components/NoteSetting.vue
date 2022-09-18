<script lang="ts" setup>
import { useConfirmDialog } from "@vueuse/core";
import { computed, ref, CSSProperties, watch } from "vue";

const status = ref(false);
const showFontSizeSelector = ref(false);

const bgColorRange: string[] = [
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

const fontSizeRange: string[] = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "30px",
  "50px"
];

const fontColorRange: string[] = [];

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

const openFontBlock = () => {
  document.querySelectorAll<HTMLInputElement>(".font-block").forEach((item, index) => {
    item.style.transform = `translate(${(index-fontSizeRange.length/2) * 80}px, -80px)`;
  });
  showFontSizeSelector.value = true;
};

const closeFontBlock = () => {
  document.querySelectorAll<HTMLInputElement>(".font-block").forEach(function (item) {
    item.style.transform = "none";
  });
  showFontSizeSelector.value = false;
};

const changeBgColor = () => {
  return status.value ? close() : open();
};

const selectBgColor = (color: string) => {
  style.value.backgroundColor = color;
  close();
};

const selectColor = (color: string) => {
  style.value.color = color;
  console.log(color);
};


const changeFontSize = () => {
  return showFontSizeSelector.value ? closeFontBlock(): openFontBlock()
};

const selectFontSize = (fontSize: string) => {
  style.value.fontSize = fontSize;
  closeFontBlock(); 
}


</script>

<template>
  <div
    class="i-mdi:cog cursor-pointer"
    @click="reveal"
  />
  <teleport to="body">
    <div
      v-if="isRevealed"
      class="absolute w-full h-full bg-stone-600"
    >
      <!-- 确认区 -->
      <header class="h-10 flex justify-end items-center px-2 gap-x-1">
        <!-- <button @click="confirm">Save</button>
        <button @click="cancel">Cancel</button> -->
        <div
          class="i-mdi:close-circle-outline h-8 w-8 text-white"
          @click="confirm"
        />
      </header>
      <!-- 预览区 -->
      <main class="flex justify-center items-center">
        <div
          class="w-80 h-80 text-left"
          :style="style"
        >
          {{ props.content }}
        </div>
      </main>
      <!-- 操作区 -->
      <footer class="w-full fixed bottom-0 h-20 flex justify-center items-center gap-x-25">
        <div
          class="i-mdi:file w-10 h-10"
          :style="{ color: style.backgroundColor }"
          @click="changeBgColor"
        />
        <div
          class="i-mdi:format-text w-10 h-10 text-white"
          @click="changeFontSize"
        />
        <!-- <div class="i-mdi:format-color-text w-10 h-10 text-black" /> -->
        <!-- <div class="flex items-center gap-x-3">
          <div
            v-for="(color, index) in fontColorRange"
            :key="index"
            class="circle"
            :class="style.color === color ? 'selected' : ''"
            :style="{ backgroundColor: color }"
            @click="selectColor(color)"
          />
        </div> -->
      </footer>
      <div class="bg-color-container fixed bottom-0">
        <div
          v-for="(color, index) in bgColorRange"
          :key="index"
          class="page"
          :class="style.backgroundColor === color ? 'selected' : ''"
          :style="{ backgroundColor: color }"
          @click="selectBgColor(color)"
        />
      </div>
      <div class="font-size-container fixed bottom-0">
        <div
          v-for="fontSize in fontSizeRange"
          :key="fontSize"
          class="font-block"
          :class="style.fontSize === fontSize ? 'selected' : ''"
          :style="{ fontSize }"
          @click="selectFontSize(fontSize)"
        >
          T
        </div>
      </div>
    </div>
  </teleport>
</template>
<style lang="scss" scoped>
main {
  height: calc(100% - 7.5rem);
}
.bg-color-container {
  left: calc(50% - 160px);
}
.bg-color-container div {
  width: 160px;
  height: 160px;
  background-color: #bdd3eb;
  transform-origin: top right;
  transition: all 1s;
  position: absolute;
}

.font-size-container {
  left: 50%;
  .font-block {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    font-weight: 500;
    background-color: #ffffff;
    border-radius: 10px;
    position: absolute;
    transition: all 1s;
  }
}


.circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;

  &.selected {
    width: 20px;
    height: 20px;
    border: 2px solid #ffffff;
  }
}

.bg-color-container div.selected {
  border: 2px solid #ffffff;
}
</style>
