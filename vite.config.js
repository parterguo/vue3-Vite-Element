import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path';
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // ↓路径别名，主要是这部分
    alias: {
      "/@": resolve(__dirname, "./src")
    }
  }

})
