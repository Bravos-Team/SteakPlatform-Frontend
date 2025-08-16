import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  // const env = loadEnv(mode, process.cwd(), '')

  // // Auto map tất cả biến bắt đầu bằng "VITE_" vào import.meta.env
  // const viteEnvVars = Object.fromEntries(
  //   Object.entries({ ...process.env, ...env }).filter(([key]) =>
  //     key.startsWith('VITE_')
  //   ).map(([key, val]) => [`import.meta.env.${key}`, JSON.stringify(val)])
  // )
  base: '/',
  plugins: [vue(), vueDevTools(), tailwindcss()],
  // define: viteEnvVars,
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
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
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
  },
})
