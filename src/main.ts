import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { installElementPlus } from '@/plugins/element-plus'
import { registerGlobalComponents } from '@/global-components'
import { installPinia } from '@/plugins/pinia'
import { installI18n } from '@/plugins/i18n'
import { initPermissionGuard } from '@/permission'
import { installDirectives } from '@/directives'

// styles
import '@/styles/main.scss'

const app = createApp(App)

installPinia(app)
installElementPlus(app)
registerGlobalComponents(app)
installI18n(app)
initPermissionGuard(router)
installDirectives(app)

app.use(router)

app.mount('#app')
