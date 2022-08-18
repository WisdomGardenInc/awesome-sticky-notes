import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import presetIcons from '@unocss/preset-icons'
import presetWind from '@unocss/preset-wind'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetIcons(), presetWind()],
    }),
  ],
});
