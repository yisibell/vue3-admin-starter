import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { installElementPlus } from '@/plugins/element-plus'
import { registerGlobalComponents } from '@/global-components'

// styles
import '@/styles/main.scss'

const app = createApp(App)

installElementPlus(app)
registerGlobalComponents(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
