import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import enLocale from '@/locales/en'
import zhLocale from '@/locales/zh'

// element-plus国际化
import enLocaleElementPlus from 'element-plus/dist/locale/en.mjs'
import zhLocaleElementPlus from 'element-plus/dist/locale/zh-cn.mjs'

export const localesConfigs = {
  en: {
    ...enLocale,
    ...enLocaleElementPlus
  },
  zh: {
    ...zhLocale,
    ...zhLocaleElementPlus
  }
}

export type LocaleType = keyof typeof localesConfigs

export const i18n = createI18n({
  legacy: false,
  missingWarn: false,
  fallbackWarn: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: localesConfigs
})

export const setLocale = (lang: LocaleType) => {
  i18n.global.locale.value = lang
}

export const installI18n = (app: App) => {
  const AppStore = useAppStore()

  setLocale(AppStore.language)

  app.use(i18n)
}
