import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    process.env.NODE_ENV !== 'production' && vueDevTools(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          tanstack: ['@tanstack/vue-query'],
          tiptap: ['@tiptap/vue-3', '@tiptap/starter-kit'],
          axios: ['axios'],
          pinia: ['pinia'],
          lucide: ['lucide-vue-next'],
        },
      },
    },
  }
})
