import type { App } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// // 如果使用 unplugin-element-plus 并且只使用组件 API，你需要手动导入样式。
// import 'element-plus/es/components/message/style/css'

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
