import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import { svg4VuePlugin } from 'vite-plugin-svg4vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

const isDev = () => process.env.NODE_ENV === 'development'

const srcPath = fileURLToPath(new URL('./src', import.meta.url))
const rootPath = fileURLToPath(new URL('./', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  base: isDev() ? '/' : '/vue3-admin-starter/',
  resolve: {
    alias: {
      '@': srcPath,
      '~': srcPath,
      '@@': rootPath,
      '~~': rootPath
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`
      }
    }
  },
  plugins: [
    vue(),
    svg4VuePlugin({
      assetsDirName: 'assets/icons'
    }),

    AutoImport({
      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [ElementPlusResolver()]
    }),

    Components({
      resolvers: [
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ]
    }),

    ElementPlus({
      useSource: true
    })
  ],
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://ft-api-nvwa.smaloo.com',
        changeOrigin: true
      }
    }
  }
})
