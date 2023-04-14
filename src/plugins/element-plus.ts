import type { App } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export const installElementPlus = (app: App<Element>) => {
  app.use(ElementPlus)

  // icons
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    if (key.toLowerCase() === 'menu') {
      app.component('icon-menu', component)
    } else {
      app.component(key, component)
    }
  }
}
