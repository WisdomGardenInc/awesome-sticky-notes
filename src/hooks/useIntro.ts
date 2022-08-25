import { onMounted, ref } from "vue";
import introJs from "intro.js";
import { useLocalStorage } from "@vueuse/core";

export const useIntro = () => {
  const getIntroOptions = () => {
    return {
      prevLabel: "上一步",
      nextLabel: "下一步",
      doneLabel: "好的",
      steps: [
        {
          element: ".bg",
          intro: "双击空白区域可新建便签",
        },
        {
          element: '.note:first-of-type',
          title: "在这里,你可以...",
          intro: "记录任何你想记录的内容!",
        },
        {
          element: '.note:first-of-type',
          title: "快捷打开链接",
          intro: "按下ctrl(cmd)+shift高亮链接",
        },
        {
          intro: "Have Fun!",
        },
      ],
    };
  };

  const endIntro = ref<boolean>(false);
  useLocalStorage("endIntro-v1", endIntro);

  const completeIntro = () => {
    endIntro.value = true;
  };

  const startIntro = () => {
    introJs().setOptions(getIntroOptions()).onexit(completeIntro).start();
  };

  onMounted(() => {
    if (!endIntro.value) {
    startIntro();
    }
  })
}
