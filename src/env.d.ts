/// <reference types="vite/client" />
/// <reference types="vite-plugin-svg4vue/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_PROXY_TARGET: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
