import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  build: {
    sourcemap: false,
    target: 'es2018',
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
  },
})