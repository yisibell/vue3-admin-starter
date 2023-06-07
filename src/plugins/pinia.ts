import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

const piniaStore = createPinia()

piniaStore.use(piniaPluginPersistedstate)

const installPinia = (app: App) => {
  app.use(piniaStore)
}

export { piniaStore, installPinia }
