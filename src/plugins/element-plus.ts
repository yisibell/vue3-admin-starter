import type { App } from 'vue'
import ElementPlus from 'element-plus'

export const installElementPlus = (app: App<Element>) => {
  app.use(ElementPlus)
}
