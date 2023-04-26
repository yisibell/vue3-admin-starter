import type { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue'

export const registerGlobalComponents = (app: App) => {
  ;[SvgIcon].forEach((v) => {
    app.component(v.name, v)
  })
}
